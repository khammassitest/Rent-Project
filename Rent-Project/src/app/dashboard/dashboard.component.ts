import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../services/user/user.service';
import { RentalService } from '../services/rental/rental.service';
import { User } from '../models/user';
import { Property } from '../models/property';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  rentals: Property[] = [];

  constructor(
    private userService: UserService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    
    // Charger les utilisateurs
    this.userService.getUsers().subscribe({
      next: (response) => {
        const extractedUsers = (response as any).$values ?? response;
        this.users = extractedUsers;
        console.log('✅ Utilisateurs extraits :', this.users);
      },
      error: (err) => console.error('❌ Erreur lors du chargement des utilisateurs :', err)
    });

    // Charger les propriétés (locations)
    this.rentalService.getProperties().subscribe({
      next: (response) => {
        const extractedRentals = (response as any).$values ?? response;
        this.rentals = extractedRentals;
        console.log('✅ Propriétés extraites :', this.rentals);
      },
      error: (err) => console.error('❌ Erreur lors du chargement des propriétés :', err)
    });
  }

  get totalUsers(): number {
    return this.users.length;
  }

  get totalRentals(): number {
    return this.rentals.length;
  }

  get availableRentals(): number {
    return this.rentals.filter(r =>
      r.status !== undefined &&
      r.status !== null &&
      r.status.toString().trim().toLowerCase() === 'available'
    ).length;
  }

  get unavailableRentals(): number {
    return this.rentals.filter(r =>
      r.status !== undefined &&
      r.status !== null &&
      r.status.toString().trim().toLowerCase() === 'rented'
    ).length;
  }

  rentalStatusText(status: string | number | undefined): string {
    const normalized = status?.toString().trim().toLowerCase();
    switch (normalized) {
      case '1':
      case 'available':
        return 'Disponible';
      case '2':
      case 'rented':
        return 'Loué';
      default:
        return 'Inconnu';
    }
  }

  rentalStatusClass(status: string | number | undefined): string {
    const normalized = status?.toString().trim().toLowerCase();
    switch (normalized) {
      case '1':
      case 'available':
        return 'text-success';
      case '2':
      case 'rented':
        return 'text-danger';
      default:
        return '';
    }
  }
}
