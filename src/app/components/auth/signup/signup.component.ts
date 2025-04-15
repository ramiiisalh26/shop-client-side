import { Component } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';
import { signup } from '../../../api/signup/signup';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  // sigup:signup = new signup();
  constructor(private auth: AuthService, private router: Router,private cookieService: CookieService){}

  signUp = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    re_password: new FormControl(''),
    role: new FormControl('customer')
  })

  onSubmit(){
    const signUpData: signup = {
      first_name: this.signUp.value.first_name ?? null,
      last_name: this.signUp.value.last_name ?? null,
      email: this.signUp.value.email ?? null,
      password: this.signUp.value.password ?? null,
      re_password: this.signUp.value.re_password ?? null,
      role: "USER"
    }
    this.auth.signUp(signUpData).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    }, err=>console.log(err));
  }
}
