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

  addRating(data: object): Observable<any> {
    return this.http.post<any>(this.addStudentUrl, data);
  }

  editRating(id: string, rating: number): Observable<any> {
    const data = {
      idEdit: id,
      ratingEdit: rating
    };
    return this.http.put<any>(this.editStudentUrl, data);
  }

  deleteRating(id: string): Observable<any> {
    const idDelete = new HttpParams().set('login', id + '' );
    return this.http.delete<any>(this.deleteStudentUrl, { params: idDelete });
  }
}
