import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './user/user.component';
import { RentalDetailsComponent } from './rentaldetails/rentaldetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './extra/about/about.component';
import { ContactComponent } from './extra/contact/contact.component';
import { RentalComponent } from './rental/rental.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'rentaldetails/:id', component: RentalDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'favorite', component: FavoriteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
