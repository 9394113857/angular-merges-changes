import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public rtr: Router, public srvc: LoginService) {}

  ngOnInit(): void {}

  logout() {
    this.srvc.logout();
    this.rtr.navigate(['login']);
  }
}
