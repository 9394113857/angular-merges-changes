import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  errorMsg: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.getProfile().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (err) => {
        this.errorMsg = 'Session expired or unauthorized. Please login again.';
        this.loginService.logout();
        this.router.navigate(['/login']);
      }
    );
  }
}
