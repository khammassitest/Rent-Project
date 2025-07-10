import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule], 
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  connectedUser!: User;
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getConnectedUser().subscribe({
      next: (user) => {
        this.connectedUser = user;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’utilisateur connecté', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.connectedUser) {
      alert('Utilisateur non connecté.');
      return;
    }

    console.log('Nom:', this.connectedUser.fullName);
    console.log('Email:', this.connectedUser.email);
  }
}
