import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from '../services/user/user.service';
import { RentalService } from '../services/rental/rental.service';
import { User } from '../models/user';
import { Property } from '../models/property';

import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  rentals: Property[] = [];

  pieChartData: ChartConfiguration<ChartType>['data'] = {
    labels: ['Disponible', 'Loué'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#4caf50', '#f44336']
      }
    ]
  };

  pieChartType: ChartType = 'doughnut';

  pieChartOptions: ChartConfiguration<ChartType>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  constructor(
    private userService: UserService,
    private rentalService: RentalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        const extractedUsers = (response as any).$values ?? response;
        this.users = extractedUsers;
      },
      error: (err) => console.error('❌ Erreur lors du chargement des utilisateurs :', err)
    });

    this.rentalService.getProperties().subscribe({
      next: (response) => {
        const extractedRentals = (response as any).$values ?? response;
        // Ne garder que les propriétés avec un statut valide
        this.rentals = extractedRentals.filter((r: Property) => r && r.status !== undefined && r.status !== null);

        console.log('Statuts récupérés des propriétés:', this.rentals.map(r => r.status));
        this.updateChart();
      },
      error: (err) => console.error('❌ Erreur lors du chargement des propriétés :', err)
    });
  }

  updateChart(): void {
    const available = this.availableRentals;
    const rented = this.unavailableRentals;

    this.pieChartData = {
      ...this.pieChartData,
      datasets: [{ ...this.pieChartData.datasets[0], data: [available, rented] }]
    };
  }

  goToUsers(): void {
    this.router.navigate(['/user']);
  }

  goToRentals(): void {
    this.router.navigate(['/rental']);
  }

  get totalUsers(): number {
    return this.users.length;
  }

  get totalRentals(): number {
    return this.rentals.length;
  }

  get availableRentals(): number {
    return this.rentals.filter(r =>
      r.status.toString().trim().toLowerCase() === 'available'
    ).length;
  }

  get unavailableRentals(): number {
    return this.rentals.filter(r =>
      r.status.toString().trim().toLowerCase() === 'rented'
    ).length;
  }

  rentalStatusText(status: string | number | undefined): string {
    const normalized = status?.toString().trim().toLowerCase();
    switch (normalized) {
      case 'available':
        return 'Disponible';
      case 'rented':
        return 'Loué';
      default:
        return 'Inconnu';
    }
  }

  rentalStatusClass(status: string | number | undefined): string {
    const normalized = status?.toString().trim().toLowerCase();
    switch (normalized) {
      case 'available':
        return 'text-success';
      case 'rented':
        return 'text-danger';
      default:
        return '';
    }
  }
}
