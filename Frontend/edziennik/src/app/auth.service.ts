import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loginUrl = 'http://localhost:3000/api/login';
  private getStudentsUrl = 'http://localhost:3000/api/students';
  private addStudentUrl = 'http://localhost:3000/api/students/add';
  private editStudentUrl = 'http://localhost:3000/api/students/edit';
  private deleteStudentUrl = 'http://localhost:3000/api/students/delete';

  constructor(private http: HttpClient) { }

  loginUser(user): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  getStudents(): Observable<any> {
    return this.http.get<any>(this.getStudentsUrl);
  }

  addRating(data: object): Observable<any> {
    return this.http.post<any>(this.addStudentUrl, data);
  }

  deleteRating(idDelete: string, loginDelete: string): Observable<any> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: idDelete,
        login: loginDelete,
      },
    };

    return this.http.delete<any>(this.deleteStudentUrl, options);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
