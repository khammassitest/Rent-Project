import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router'; 
import { UserRole } from '../../models/user-role.enum';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.loginError = '';
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const users = this.userService.getUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        console.log('Login successful', user);
        this.redirectUser(user);
      } else {
        this.loginError = 'Invalid email or password.';
      }
    } else {
      this.loginForm.markAllAsTouched(); 
      this.loginError = 'Invalid email or password.'; 
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
    
  private redirectUser(user: User): void {
    if (user.role === UserRole.Admin) {
      this.router.navigate(['/dashboard']);
    } else if (user.role === UserRole.User) {
      this.router.navigate(['/rental']);
    } else {
      console.log('Unknown role', user.role);
    }
  }
}
