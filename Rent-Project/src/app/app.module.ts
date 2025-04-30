import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartialsModule } from './partials/partials.module';
import { UserComponent } from './user/user.component';
import { RentalComponent } from './rental/rental.component';
import { AuthModule } from './auth/auth.module';
import { RentaldetailsComponent } from './rentaldetails/rentaldetails.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RentalComponent,
    RentaldetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PartialsModule,
    FormsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
