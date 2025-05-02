import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  connectedUser: User;
  dropdownOpen: boolean = false;
  showEditModal: boolean = false;
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.connectedUser = this.userService.getConnectedUser() || {} as User;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  editProfile() {
    this.connectedUser = this.userService.getConnectedUser() || {} as User;
    this.showEditModal = true;
    this.dropdownOpen = false;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  saveProfile() {
    if (this.connectedUser) {
      this.userService.updateUser(this.connectedUser);
      this.closeEditModal();
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
