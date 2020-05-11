import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.loginUser();
  }

  loginUser() {
    this.service.getStudents().subscribe(
      (res) => {
        this.students = res;
        for (let i = 0; i < this.students.length; i++) {
          this.isVisible[i] = true;
        }
        console.log(this.students.length);
      },
      (err) => console.log(err)
    );
  }

  addRating(index: number) {
    this.isVisible[index] = !this.isVisible[index];
  }

  saveRating(login: string, index: number) {
    console.log(this.value[index]);
    console.log(this.for[index]);

    /*this.service.addRating('').subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    ); */
  }
  editRating(login: string) {
    this.service.editRating(login).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  deleteRating(login: string) {
    this.service.deleteRating(login).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
