import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

interface User {
  id: string;
  role: string;
  email: string;
  // autres champs ici
}

interface LoginResponse {
  user: User;
  token: string;
}

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
      next: (response: LoginResponse) => {
        console.log("Connexion réussie !");
        console.log('Réponse brute du backend :', response);

        const user = response.user;

        if (user?.role && user?.id) {
          localStorage.setItem('userRole', user.role);
          localStorage.setItem('userId', user.id);

          if (user.role === 'ADMIN' || user.role === 'AGENT') {
            this.router.navigate(['/dashboard']);
          } else if (user.role === 'CLIENT') {
            this.router.navigate(['/rental']);
          } else {
            this.error = "Rôle utilisateur non reconnu.";
          }
        } else {
          this.error = "Utilisateur invalide.";
        }
      },
      error: err => {
        console.error('Erreur de connexion', err);
        this.error = 'Email ou mot de passe incorrect.';
      }
    });
  }
}
