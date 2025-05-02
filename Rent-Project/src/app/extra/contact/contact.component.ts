import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  connectedUser: User;
  message: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.connectedUser = this.userService.getConnectedUser() || {} as User;
  }

  onSubmit() {
    console.log('User name:', this.connectedUser.name);
    console.log('User email:', this.connectedUser.email);
    console.log('Message submitted:', this.message);
  }
}
