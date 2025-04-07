import {Component, Inject} from '@angular/core';
import {KanbanService} from "../../kanban.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.css']
})
export class TaskDetailDialogComponent {
  taskForm: FormGroup;
  isAdmin: boolean = localStorage.getItem('role') === 'admin';

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
  }

  ngOnInit(): void {}

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
