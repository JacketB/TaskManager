import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  userLogin: string | undefined = '';
  userRole: string | undefined = '';

  isAuthenticated: boolean = false;

  constructor(private router: Router) {
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

  logout(): void {
    this.router.navigate(['/login']);
  }
}
