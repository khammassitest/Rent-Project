// partials.module.ts corrigé

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent  // seul FooterComponent ici si NON standalone
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FooterComponent
  ]
})
export class PartialsModule { }
