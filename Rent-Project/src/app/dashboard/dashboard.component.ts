import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../services/user/user.service';
import { RentalService } from '../services/rental/rental.service';
import { User } from '../models/user';
import { House } from '../models/rental';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],  // important pour les directives Angular dans le template
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  rentals: House[] = [];

  constructor(
    private userService: UserService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error('Erreur lors du chargement des utilisateurs :', err)
    });

    this.rentals = this.rentalService.houses;
  }

  get totalUsers(): number {
    return this.users.length;
  }

  get totalRentals(): number {
    return this.rentals.length;
  }

  get availableRentals(): number {
    return this.rentals.filter(r => r.status?.trim().toLowerCase() === 'available').length;
  }

  get unavailableRentals(): number {
    return this.rentals.filter(r => r.status?.trim().toLowerCase() === 'rented').length;
  }
}
