import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  isVisible = [];
  students: any = [];

  countColumns = 0;
  countColumnsArray = [];
  for = [];
  value = [];

  constructor(public service: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    if (localStorage.getItem('login')) {
      this.service.userLogin = localStorage.getItem('login');
    }

    this.service.getStudents().subscribe(
      (res) => {
        this.students = res;
        for (let i = 0; i < this.students.length; i++) {
          if (this.students[i].ratings.length > this.countColumns) {
            this.countColumns = this.students[i].ratings.length;
          }
          this.countColumnsArray = Array(this.countColumns).fill(1);
          this.isVisible[i] = true;
        }
        if (!localStorage.getItem('login')) {
          localStorage.setItem('login', this.service.userLogin);
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }

  addRating(index: number) {
    this.isVisible[index] = !this.isVisible[index];
  }

  saveRating(loginAdd: string, index: number) {
    this.isVisible[index] = !this.isVisible[index];
    const addData = {
      login: loginAdd,
      forAdd: this.for[index],
      ratingAdd: this.value[index],
    };

    this.service.addRating(addData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    window.location.reload();
  }
}
