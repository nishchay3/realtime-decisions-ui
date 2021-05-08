import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './dashboard/sign-in/sign-in.component';
import { SignUpComponent } from './dashboard/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'user', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
