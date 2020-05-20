import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';
import { AuthGuardStudents } from './auth.guard';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { AuthGuardLogin } from './auth.guardLogin';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardLogin]
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuardStudents]
  },
  {
    path: 'myprofile',
    component: ProfileStudentComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
