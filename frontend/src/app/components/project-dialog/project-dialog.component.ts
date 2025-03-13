import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProjectData} from "../../consts/ProjectData";

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent {
  project: ProjectData = { name: '', description: '' };

  constructor(private dialogRef: MatDialogRef<ProjectDialogComponent>) {}

  addProject(): void {
    if (this.project.name.trim()) {
      this.dialogRef.close(this.project);
    }
  }
}

