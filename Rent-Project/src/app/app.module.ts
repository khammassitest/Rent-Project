import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartialsModule } from './partials/partials.module';
import { UserComponent } from './user/user.component';
import { RentalComponent } from './rental/rental.component';
import { AuthModule } from './auth/auth.module';
import { RentaldetailsComponent } from './rentaldetails/rentaldetails.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExtraModule } from './extra/extra.module';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RentalComponent,
    RentaldetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PartialsModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    ExtraModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
