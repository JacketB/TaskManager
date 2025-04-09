import {Component, Inject, OnInit} from '@angular/core';
import {KanbanService} from "../../kanban.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from "moment";

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.css']
})
export class TaskDetailDialogComponent implements OnInit {
  taskForm: FormGroup;
  isAdmin: boolean = localStorage.getItem('role') === 'admin';
  comments: any[] = [];
  newCommentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: any,
    private fb: FormBuilder,
    private kanbanService: KanbanService
  ) {
    this.taskForm = this.fb.group({
      title: [{ value: task.title, disabled: !this.isAdmin }],
      description: [{ value: task.description, disabled: !this.isAdmin }],
      dueDate: [{ value: task.dueDate, disabled: !this.isAdmin }],
      priority: [{ value: task.priority, disabled: !this.isAdmin }]
    });

    this.newCommentForm = this.fb.group({
      newComment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadComments();
    console.log(this.task);
  }

  loadComments() {
    this.kanbanService.getCommentsByTaskId(this.task.id).subscribe((comments) => {
      this.comments = comments;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  addComment() {
    if (this.newCommentForm?.invalid) return;

    const formData = new FormData();
    formData.append('content', this.newCommentForm.value.newComment);
    formData.append('taskId', this.task.id.toString());
    formData.append('userId', localStorage.getItem('id') || '0');

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.kanbanService.createComment(formData).subscribe((comment) => {
      this.comments.push(comment);
      this.newCommentForm.reset();
      this.selectedFile = null;
    });
  }



  saveChanges() {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.task, ...this.taskForm.value };
      this.kanbanService.updateTask(updatedTask.id, updatedTask).subscribe(() => {
        this.dialogRef.close(updatedTask);
      });
    }
  }

  deleteTask() {
    if(this.task) {
      this.kanbanService.deleteTask(this.task.id).subscribe(() => {
        this.dialogRef.close('deleted');
      })
    }
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // обнуляем время
    return date ? date >= today : false;
  };
  protected readonly moment = moment;
}
