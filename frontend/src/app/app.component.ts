import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectData} from "./consts/ProjectData";
import {GET_ALL_PROJECTS_URL} from "./consts/api";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  userLogin: string | undefined = '';
  userRole: string | undefined = '';

  allProjects: any = [];
  projectTitle: string = '';
  isAuthenticated: boolean = false;

  constructor(private router: Router, private http: HttpClient) {
    setInterval(()=>{
      const login = localStorage.getItem('login');
      const role = localStorage.getItem('role');

      if (login && role) {
        this.userLogin = login;
        this.userRole = role;

        this.isAuthenticated = true;
      } else this.isAuthenticated = false;

    },100)
  }

  ngOnInit() {
    this.getProjects();

    this.router.events.subscribe(() => {
      this.checkProjectRoute();
    });
  }

  checkProjectRoute(): void {
    const projectId = this.router.url.split('/');
    if (projectId) {
      const project = this.allProjects.find((p: any) => p.id === +projectId[2]);
      if (project) {
        this.projectTitle = project.name;
      }
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  getProjects() {
    this.http.get<ProjectData[]>(GET_ALL_PROJECTS_URL).subscribe((response: ProjectData[]) => {
      this.allProjects = response;
    })
  }
}
