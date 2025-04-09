import {Component, Inject, OnInit} from '@angular/core';
import {KanbanService} from "../../kanban.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
  }

  loadComments() {
    this.kanbanService.getCommentsByTaskId(this.task.id).subscribe((comments) => {
      this.comments = comments;
    });
  }

  addComment() {
    if (this.newCommentForm?.invalid) return;

    const newComment = {
      content: this.newCommentForm?.value.newComment,
      taskId: this.task.id,
      userId: parseInt(localStorage.getItem('id') || '0', 10), // Получаем id пользователя из localStorage
    };

    this.kanbanService.createComment(newComment).subscribe((comment) => {
      this.comments.push(comment); // Добавляем комментарий в список
      this.newCommentForm?.reset(); // Очищаем форму
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
}
