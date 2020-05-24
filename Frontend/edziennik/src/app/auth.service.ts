import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogin = '';
  whoIsLogged = '';
  students: any = [];

  private loginUrl = 'https://polar-tundra-69590.herokuapp.com/api/login';
  private getStudentsUrl = 'https://polar-tundra-69590.herokuapp.com/api/students';
  private getRatingsUrl = 'https://polar-tundra-69590.herokuapp.com/api/ratings';
  private addStudentUrl = 'https://polar-tundra-69590.herokuapp.com/api/students/add';
  private deleteStudentUrl = 'https://polar-tundra-69590.herokuapp.com/api/students/delete';

  constructor(private http: HttpClient) { }

  loginUser(user): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  getStudents(): Observable<JSON> {
    return this.http.get<any>(this.getStudentsUrl);
  }

  getRatings(loginUser: string): Observable<any> {
    const parm = new HttpParams().set('login', loginUser + '');
    return this.http.get<any>(this.getRatingsUrl, {params: parm});
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
