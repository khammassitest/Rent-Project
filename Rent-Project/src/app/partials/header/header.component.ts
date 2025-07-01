import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';           // Pour *ngIf, *ngFor, etc.
import { FormsModule } from '@angular/forms';             // Pour [(ngModel)] si utilisé dans template
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connectedUser: User = {} as User;
  dropdownOpen: boolean = false;
  showEditModal: boolean = false;
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadConnectedUser();
  }

  loadConnectedUser() {
    this.userService.getConnectedUser().subscribe({
      next: (user) => {
        this.connectedUser = user;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’utilisateur connecté', err);
        this.connectedUser = {} as User;
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  editProfile() {
    this.loadConnectedUser();
    this.showEditModal = true;
    this.dropdownOpen = false;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  saveProfile() {
    if (this.connectedUser) {
      this.userService.updateUser(this.connectedUser).subscribe({
        next: (updatedUser) => {
          this.connectedUser = updatedUser;
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du profil', err);
        }
      });
    }
  }

  goToUser() {
    this.router.navigate(['/user']);
  }

  goToDash() {
    this.router.navigate(['/dashboard']);
  }

  goTorental() {
    this.router.navigate(['/rental']);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  shouldShowProfile(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute === '/login' || currentRoute === '/register');
  }
}
