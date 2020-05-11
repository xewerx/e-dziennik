import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  addRating(login: string): Observable<any> {
    return this.http.post<any>(this.addStudentUrl, login);
  }

  editRating(login: string): Observable<any> {
    return this.http.put<any>(this.editStudentUrl, login);
  }

  deleteRating(login: string): Observable<any> {
    const parm = new HttpParams().set('login', login + '' );
    return this.http.delete<any>(this.deleteStudentUrl, { params: parm });
  }
}
