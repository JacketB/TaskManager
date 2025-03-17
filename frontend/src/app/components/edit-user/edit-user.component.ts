import {Component, Inject} from '@angular/core';
import {UPDATE_USERS_URL, USERS_URL} from "../../consts/api";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserData} from "../../consts/UserData";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      id: [this.data.id, Validators.required],
      name: [this.data.name, Validators.required],
      role: [this.data.role, Validators.required],
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.http.put(`${UPDATE_USERS_URL}${this.data.id}`, this.userForm.value).subscribe((response: any) => {
        this.dialogRef.close(this.userForm.value);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
