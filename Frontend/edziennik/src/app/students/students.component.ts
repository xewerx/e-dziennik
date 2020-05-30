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

  countColumns = 0;
  countColumnsArray = [];
  for = [];
  value = [];

  invalidRating = [];

  constructor(public service: AuthService, private router: Router) {
    this.service.spinner = true;
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    if (localStorage.getItem('login')) {
      this.service.userLogin = localStorage.getItem('login');
    }

    this.service.getStudents().subscribe(
      (res) => {
        this.service.students = res;
        for (let i = 0; i < this.service.students.length; i++) {
          if (this.service.students[i].ratings.length > this.countColumns) {
            this.countColumns = this.service.students[i].ratings.length;
          }
          this.isVisible[i] = true;
        }

        this.countColumnsArray = Array(this.countColumns).fill(1);

        if (!localStorage.getItem('login')) {
          localStorage.setItem('login', this.service.userLogin);
        }

        this.service.spinner = false;
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
      // tslint:disable-next-line: triple-equals
      this.value[index] == 1 ||
      // tslint:disable-next-line: triple-equals
      this.value[index] == 2 ||
      // tslint:disable-next-line: triple-equals
      this.value[index] == 3 ||
      // tslint:disable-next-line: triple-equals
      this.value[index] == 4 ||
      // tslint:disable-next-line: triple-equals
      this.value[index] == 5 ||
      // tslint:disable-next-line: triple-equals
      this.value[index] == 6
    ) {
      this.isVisible[index] = !this.isVisible[index];
      const addData = {
        login: loginAdd,
        forAdd: this.for[index],
        ratingAdd: this.value[index],
      };


      this.service.students[index].ratings.push({
        value: this.value[index],
        for: this.for[index],
        date: new Date().toLocaleDateString()
      });

      this.service.addRating(addData).subscribe((res) => {
        // console.log(res);
      }, (err) => {
        // console.log(err);
      });

    } else {
      this.invalidRating[index] = 'Podaj prawidłową ocenę!';
    }
  }
}
