// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { UserRole } from '../../models/user-role.enum';

@Component({
  selector: 'app-register',
  standalone:false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  userRoles = Object.values(UserRole);

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      profession: ['', Validators.required],
      locked: [false],
      active: [true],
      role: [UserRole.User, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: User = {
        id: Date.now(), // simplistic ID for demo
        ...this.registerForm.value,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('User registered:', newUser);
      // Optionally push to userService or API here
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
