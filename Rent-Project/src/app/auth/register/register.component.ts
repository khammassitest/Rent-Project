import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    occupation: new FormControl(''),
    incomeRange: new FormControl(''),
    numberOfResidents: new FormControl('')
  });

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration Data:', this.registerForm.value);
    }
  }
}
