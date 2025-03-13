import {CanActivate} from '@angular/router';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor() {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin';
  }
}
