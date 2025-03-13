import { Component } from '@angular/core';
import {UserData} from "../../consts/UserData";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {
  user: UserData = {name: '', password: '', role: ''};

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>) {}

  addUser(): void {
    if (this.user) {
      this.dialogRef.close(this.user);
    }
  }
}
