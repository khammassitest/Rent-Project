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
    this.loadUsers();
    this.loadProperties();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        const extracted = (response as any).$values ?? response;
        this.users = Array.isArray(extracted) ? extracted : [];
      },
      error: (err) => console.error('❌ Erreur chargement utilisateurs :', err)
    });
  }

  private loadProperties(): void {
    this.rentalService.getProperties().subscribe({
      next: (response) => {
        const extractedRentals = this.dereferenceJSON(response);
        this.rentals = Array.isArray(extractedRentals)
          ? extractedRentals.filter((r: Property) => r?.status != null)
          : [];

        console.log('🔎 Statuts des propriétés :', this.rentals.map(r => r.status));
        this.updateChart();
      },
      error: (err) => console.error('❌ Erreur chargement propriétés :', err)
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
    return this.rentals.filter(r => r.status?.toString().toUpperCase() === 'AVAILABLE').length;
  }
  getUserFullName(userId: number | string): string {
  const user = this.users.find(u => u.id?.toString() === userId?.toString());
  return user ? user.fullName ??  'Utilisateur inconnu' : 'Utilisateur inconnu';
}


  get unavailableRentals(): number {
    return this.rentals.filter(r => r.status?.toString().toUpperCase() === 'RENTED').length;
  }

  rentalStatusText(status: string | number | undefined): string {
    const normalized = status?.toString().trim().toUpperCase();
    switch (normalized) {
      case 'AVAILABLE':
        return 'Disponible';
      case 'RENTED':
        return 'Loué';
      default:
        return 'Inconnu';
    }
  }

  rentalStatusClass(status: string | number | undefined): string {
    const normalized = status?.toString().trim().toUpperCase();
    switch (normalized) {
      case 'AVAILABLE':
        return 'text-success';
      case 'RENTED':
        return 'text-danger';
      default:
        return '';
    }
  }

  /**
   * 🔁 Convertit un JSON .NET sérialisé avec $id / $ref en objets réels
   */
  private dereferenceJSON(data: any): any[] {
    if (!data) return [];

    const objectsById: Record<string, any> = {};
    const root = Array.isArray(data) ? data : (data.$values ?? []);
    const stack: any[] = root.slice();

    const collect = (item: any) => {
      if (item && typeof item === 'object') {
        if (item.$id) {
          objectsById[item.$id] = item;
        }
        for (const key in item) {
          if (item.hasOwnProperty(key) && typeof item[key] === 'object') {
            stack.push(item[key]);
          }
        }
      }
    };

    while (stack.length) {
      const current = stack.pop();
      if (Array.isArray(current)) {
        current.forEach(collect);
      } else {
        collect(current);
      }
    }

    const resolveRefs = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(resolveRefs);
      } else if (obj && typeof obj === 'object') {
        if (obj.$ref) {
          return objectsById[obj.$ref];
        }
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            obj[key] = resolveRefs(obj[key]);
          }
        }
      }
      return obj;
    };

    return resolveRefs(root);
  }
}
