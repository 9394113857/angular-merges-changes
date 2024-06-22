import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public srvc: LoginService, public rtr: Router) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [Validators.required])
  });

  onSubmit() {
    const uname = this.loginForm.value.uname!;
    const pwd = this.loginForm.value.pwd!;
    this.srvc.login(uname, pwd).subscribe(
      response => {
        this.srvc.setSession(response);
        this.rtr.navigate(['home']);
      },
      error => {
        alert('Invalid User..');
      }
    );
  }
}
