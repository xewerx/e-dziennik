import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    login: '',
    password: ''
  };

  invalidData = '';

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.service.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.service.userLogin = this.loginUserData.login;
        if (res.status === 'teacher') {
        this.router.navigate(['/students']);
        } else {
          this.router.navigate(['/myprofile']);
        }

      },
      err => {
        this.invalidData = err.error;
        this.loginUserData.password = '';
      }
    );
  }

}
