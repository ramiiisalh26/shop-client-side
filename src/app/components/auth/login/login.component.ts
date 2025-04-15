import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { login } from '../../../api/login/login';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private auth: AuthService){}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(){
    const loginForm: login = {
      email: this.loginForm.value.email ?? null,
      password: this.loginForm.value.password ?? null,
      role: null,
      access_token: null,
      refresh_token: null
    } 
    this.auth.login(loginForm).subscribe(data => {      
      console.log(data);
      console.log(this.auth.getAuthenticatedState());
      window.location.replace('/');
    },err => console.log(err));
  }
  
}
