import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalComponent } from './rental/rental.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './user/user.component';
import { RentaldetailsComponent } from './rentaldetails/rentaldetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';  // ✅ Import du DashboardComponent

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'user', component: UserComponent },
  { path: 'rentaldetails/:id', component: RentaldetailsComponent },
  { path: 'dashboard', component: DashboardComponent }  // ✅ Ajout de la route pour Dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
