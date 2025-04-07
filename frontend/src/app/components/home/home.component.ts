import { Component } from '@angular/core';
import {ProjectDialogComponent} from "../project-dialog/project-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProjectData} from "../../consts/ProjectData";
import {HttpClient} from "@angular/common/http";
import {ADD_NEW_PROJECT_URL, DELETE_PROJECT_URL, GET_ALL_PROJECTS_URL} from "../../consts/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newProject?: ProjectData;
  allProjects?: ProjectData[];
  isAdmin: boolean = localStorage.getItem('role') === 'admin';

  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router) {
    this.getProjects();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result: ProjectData) => {
      if (result) {
        this.newProject = result;

        this.http.post(ADD_NEW_PROJECT_URL, result, { responseType: 'json' }).subscribe((response) => {
          if(response) {
            this.getProjects();
          }
        })
      }
    });
  }

  getProjects() {
    this.http.get<ProjectData[]>(GET_ALL_PROJECTS_URL).subscribe((response: ProjectData[]) => {
      this.allProjects = response;
    })
  }

  deleteProject(id: number | undefined = undefined) {
    if(this.allProjects && this.allProjects.length > 0 && id) {
      this.http.delete(DELETE_PROJECT_URL + id, { responseType: 'json' }).subscribe(() => {
        this.getProjects();
      })
    }
  }

  gotoProject(id: number | undefined = undefined) {
    this.router.navigate(['/project/' + id])
  }
}
