import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartialsModule } from './partials/partials.module';
import { UserComponent } from './user/user.component';
import { RentalComponent } from './rental/rental.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RentalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PartialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
