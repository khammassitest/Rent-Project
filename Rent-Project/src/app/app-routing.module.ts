import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalComponent } from './rental/rental.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
<<<<<<< HEAD
import { RentaldetailsComponent } from './rentaldetails/rentaldetails.component';
=======
import { UserComponent } from './user/user.component';
>>>>>>> f9b7381ab43bfbb005c42a5d648356a0daa07eff

const routes: Routes = [
  { path: 'rental', component:RentalComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
<<<<<<< HEAD
  {path:"rentaldetails/:id",component:RentaldetailsComponent}
=======
  { path: 'user', component: UserComponent}
>>>>>>> f9b7381ab43bfbb005c42a5d648356a0daa07eff
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }