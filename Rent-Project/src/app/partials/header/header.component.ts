import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  connectedUserName: string = '';
  dropdownOpen: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    const connectedUser = this.userService.getConnectedUser();
    this.connectedUserName = connectedUser ? connectedUser.name : ' no user connected';
  }

  logout() {
    this.router.navigate(['/login']);
  }

  editProfile() {
    console.log('Edit profile clicked');
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  shouldShowProfile(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute === '/login' || currentRoute === '/register');
  }
}
