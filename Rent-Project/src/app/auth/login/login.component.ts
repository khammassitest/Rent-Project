import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = "Veuillez remplir tous les champs.";
      return;
    }

    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("Connexion réussie !");

        const role = response?.user?.role;

        if (role === 'ADMIN' || role === 'AGENT') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'CLIENT') {
          this.router.navigate(['/rental']);
        } else {
          this.error = "Rôle utilisateur non reconnu.";
        }
      },
      error: err => {
        console.error('Erreur de connexion', err);
        this.error = 'Email ou mot de passe incorrect.';
      }
    });
  }
}
