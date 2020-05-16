import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  ratings: any = [];
  router: any;
  constructor(public service: AuthService) { }

  ngOnInit(): void {
    this.getRatings();
  }
  getRatings() {

    if (localStorage.getItem('login')) {
      this.service.userLogin = localStorage.getItem('login');
    }

    this.service.getRatings(this.service.userLogin).subscribe(
      res => {
        [this.ratings] = res;
        if (!localStorage.getItem('login')) {
        localStorage.setItem('login', this.service.userLogin);
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
}
