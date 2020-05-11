import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
