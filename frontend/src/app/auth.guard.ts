import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const name = localStorage.getItem('name'); // Проверяем, есть ли токен
    if (name) {
      console.log(true)
      return true; // Разрешаем переход
    } else {
      this.router.navigate(['/login']); // Перенаправляем на login
      return false;
    }
  }
}
