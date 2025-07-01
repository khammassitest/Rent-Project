import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PartialsModule } from './partials/partials.module';
import { AuthModule } from './auth/auth.module';
import { ExtraModule } from './extra/extra.module';

import { UserComponent } from './user/user.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { RentaldetailsComponent } from './rentaldetails/rentaldetails.component';
import { RentalComponent } from './rental/rental.component';
import { HeaderComponent } from './partials/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    RentaldetailsComponent // uniquement les composants NON standalone ici
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PartialsModule,
    HeaderComponent,
    AuthModule,
    ExtraModule,
    UserComponent,       // standalone components dans imports
    DashboardComponent,
    RentalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
