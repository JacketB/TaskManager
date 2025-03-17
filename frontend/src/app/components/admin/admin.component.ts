import { Component } from '@angular/core';
import {UserData} from "../../consts/UserData";
import {MatDialog} from "@angular/material/dialog";
import {DELETE_USERS_URL, UPDATE_USERS_URL, USERS_URL} from "../../consts/api";
import {HttpClient} from "@angular/common/http";
import {UserDialogComponent} from "../user-dialog/user-dialog.component";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: UserData[] = [];
  displayedColumns: string[] = ['id', 'name', 'role', 'update', 'actions'];

  constructor(private dialog: MatDialog, private http: HttpClient) {
    this.getUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result: UserData) => {
      if (result) {
        this.users.push(result);

        this.http.post(USERS_URL, result, { responseType: 'json' }).subscribe((response) => {
          if(response) {
            this.getUsers();
          }
        })
      }
    });
  }

  getUsers(): void {
    this.http.get(USERS_URL).subscribe((response: UserData[] | any) => {
      this.users = response;
    })
  }

  deleteUser(id: number | undefined = undefined) {
    this.http.delete(DELETE_USERS_URL + id, { responseType: 'json' }).subscribe(() => {
      this.getUsers();
    })
  }

  editUser(user: UserData): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      data: user
    });

    dialogRef.afterClosed().subscribe((updatedUser: any) => {
      if (updatedUser) {
        const index = this.users.findIndex((u: any) => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      }
    });
  }
}
