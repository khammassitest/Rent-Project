import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountresComponent } from './countres/countres.component';
import { UserDashListComponent } from './user-dash-list/user-dash-list.component';
import { RentalsDashListComponent } from './rentals-dash-list/rentals-dash-list.component';



@NgModule({
  declarations: [
    CountresComponent,
    UserDashListComponent,
    RentalsDashListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
