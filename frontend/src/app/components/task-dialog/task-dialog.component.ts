import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {UserData} from "../../consts/UserData";
import {USERS_URL} from "../../consts/api";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  users: any[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private http: HttpClient
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, Validators.required],
      priority: ['Medium', Validators.required],
      userId: [null, Validators.required], // Исполнитель
    });
  }

  ngOnInit() {
    this.getUsers()
  }

  createTask() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  getUsers(): void {
    this.http.get(USERS_URL).subscribe((response: UserData[] | any) => {
      this.users = response;
    })
  }

  onDateChange(event: any) {
    this.taskForm.controls['dueDate'].setValue(event.value);
    this.taskForm.controls['dueDate'].updateValueAndValidity();
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // обнуляем время
    return date ? date >= today : false;
  };
}
