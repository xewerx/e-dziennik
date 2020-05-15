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

  invalidRating = '';

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
          this.isVisible[i] = true;
        }

        this.countColumnsArray = Array(this.countColumns).fill(1);

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
    if (
      this.value[index] === 1 ||
      this.value[index] === 2 ||
      this.value[index] === 3 ||
      this.value[index] === 4 ||
      this.value[index] === 5 ||
      this.value[index] === 6
    ) {
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
    } else {
      this.invalidRating = 'Podaj prawidłową ocenę!';
    }
  }
}
