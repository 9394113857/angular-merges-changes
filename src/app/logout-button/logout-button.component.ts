import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logout-button',
  template: `<button (click)="logout()">Logout</button>`
})
export class LogoutButtonComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
