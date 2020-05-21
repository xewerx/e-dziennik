import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public service: AuthService) { }
   time = '';

  ngOnInit(): void {
    this.timer();

   }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  timer() {
    setInterval(() => {
    const today = new Date();
    this.time = today.toLocaleDateString() + '  ' + today.toLocaleTimeString();
    }, 1000);
  }



}
