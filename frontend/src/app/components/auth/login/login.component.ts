import { Component } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {LOGIN_URL} from "../../../consts/api";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {

  }

  onLogin() {
    if (this.login == '' || this.password == '') {
      alert('Введите корректные данные!');
      return;
    }

    this.http.post(LOGIN_URL, { name: this.login, password: this.password }, { responseType: 'json' })
      .subscribe({
        next: (response: any) => {
          if (response) {
            localStorage.setItem('login', response.name);
            localStorage.setItem('id', response.id);
            localStorage.setItem('role', response.role);

            this.router.navigate(['/']).then(() => {
            }).catch(err => console.error("Ошибка навигации:", err));
          } else {
            alert('Ошибка авторизации');
          }
        },
        error: (err) => {
          console.error('Ошибка запроса:', err);
          alert('Ошибка сервера, попробуйте позже.');
        }
      });
  }
}
