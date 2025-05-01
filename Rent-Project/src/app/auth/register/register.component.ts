import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { UserRole } from '../../models/user-role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      profession: ['', Validators.required]
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: User = {
        id: Date.now(),
        ...this.registerForm.value,
        locked: false,
        active: true,
        role: UserRole.User,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.userService.addUser(newUser);
      this.router.navigate(['/login']);
      console.log('User registered:', newUser);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
