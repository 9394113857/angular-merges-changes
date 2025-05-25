import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string | null = null;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(''),
    address: new FormControl('')
  });

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;
    this.loginService.register(
      formValue.username!,
      formValue.password!,
      formValue.name ?? undefined,
      formValue.email ?? undefined,
      formValue.phone ?? undefined,
      formValue.address ?? undefined
    ).subscribe(
      () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      (error: Error) => {
        this.errorMessage = error.message;
      }
    );
  }
}
