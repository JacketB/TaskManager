import { Component } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {LOGIN_URL} from "../../../consts/api";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';

  constructor(private http: HttpClient) {

  }

  onLogin() {
    if (this.login == '' || this.password == '') {
      alert('Введите корректные данные!');
      return;
    }

    this.http.post(LOGIN_URL, {name: this.login, password: this.password}, { responseType: 'json' }).subscribe((response) => {
      console.log(response);
    })
  }
}
