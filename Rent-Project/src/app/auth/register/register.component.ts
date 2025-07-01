import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';             // <-- Import Router
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  fullName = '';
  address = '';
  phone = '';
  role = '';

  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}  // <-- Injection Router

  onSubmit() {
    if (!this.email || !this.password || !this.confirmPassword || !this.fullName || !this.address || !this.phone || !this.role) {
      this.error = 'Veuillez remplir tous les champs.';
      this.success = '';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      this.success = '';
      return;
    }

    this.error = '';
    this.authService.register({
      email: this.email,
      password: this.password,
      role: this.role,
      fullName: this.fullName,
      address: this.address,
      phone: this.phone
    }).subscribe({
      next: () => {
        this.success = "Inscription réussie, vous pouvez maintenant vous connecter.";
        this.error = '';

        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.fullName = '';
        this.address = '';
        this.phone = '';
        this.role = '';

        this.router.navigate(['/login']);   // <-- Redirection vers login
      },
      error: err => {
        if (err.status === 400 && err.error) {
          if (typeof err.error === 'string') {
            this.error = err.error;
          } else if (err.error.message) {
            this.error = err.error.message;
          } else {
            this.error = 'Erreur lors de l\'inscription : ' + JSON.stringify(err.error);
          }
        } else {
          this.error = "Erreur lors de l'inscription : " + (err.message || 'Erreur inconnue');
        }
        this.success = '';
      }
    });
  }
}
