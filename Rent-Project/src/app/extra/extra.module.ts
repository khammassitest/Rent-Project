import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AboutComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContactComponent
  ],
  exports: [
    AboutComponent,
    ContactComponent
  ]
})
export class ExtraModule { }