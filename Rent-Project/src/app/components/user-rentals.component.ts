import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../services/rental/rental.service';
import { Property } from '../models/property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-rentals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-rentals.component.html',
  styleUrls: ['./user-rentals.component.css']
})
export class UserRentalsComponent implements OnInit {
  rentals: Property[] = [];
  userId!: string; // ❗️ Changement de number à string

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id']; // plus de conversion en number
      if (this.userId) {
        this.loadRentals();
      } else {
        console.error('ID utilisateur invalide :', this.userId);
      }
    });
  }

  loadRentals(): void {
    this.rentalService.getRentalsByUserId(this.userId).subscribe({
      next: (data: Property[]) => {
        this.rentals = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des propriétés :', err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return 'text-success';
      case 'RENTED':
        return 'text-danger';
      default:
        return 'text-muted';
    }
  }

  getStatusLabel(status: string): string {
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return 'Disponible';
      case 'RENTED':
        return 'Loué';
      default:
        return 'Inconnu';
    }
  }
}
