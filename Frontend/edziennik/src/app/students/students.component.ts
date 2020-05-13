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

  for = [];
  value = [];


  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginUser();
  }

  loginUser() {
    this.service.getStudents().subscribe(
      res => {
        this.students = res;
        console.log(this.students);
        for (let i = 0; i < this.students.length; i++) {
          this.isVisible[i] = true;
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

  addRating(index: number) {
    this.isVisible[index] = !this.isVisible[index];
  }

  saveRating(loginAdd: string, index: number) {
    this.isVisible[index] = !this.isVisible[index];
    const addData = {login: loginAdd, forAdd: this.for[index], ratingAdd: this.value[index]};

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


