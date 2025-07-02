import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RentalService } from '../services/rental/rental.service';
import { House } from '../models/rental';
import { UserService } from '../services/user/user.service';
import { UserRole } from '../models/user-role.enum';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  houses: House[] = [];
  isAdmin = false;
  showAddRentalForm = false;
  rentalForm!: FormGroup;

  constructor(
    private rentalService: RentalService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.houses = this.rentalService.houses;

    this.userService.getConnectedUser().subscribe({
      next: (user) => {
        this.isAdmin = user?.role === UserRole.ADMIN;
      },
      error: (err) => {
        console.error('Erreur récupération utilisateur connecté', err);
      }
    });

    this.rentalForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
      reference: ['', Validators.required],
      ville: ['', Validators.required],
      rue: ['', Validators.required],
      postal: ['', Validators.required],
      superficie: [0, Validators.required],
      nbpieces: [0, Validators.required],
      etage: [0, Validators.required],
    });
  }

  toggleAddRentalForm(): void {
    this.showAddRentalForm = !this.showAddRentalForm;
  }

  addRental(): void {
    if (this.rentalForm.valid) {
      const newId = this.houses.length > 0
        ? Math.max(...this.houses.map((h) => h.id)) + 1
        : 1;

      const newRental: House = {
        id: newId,
        ...this.rentalForm.value,
        status: 'Available',
      };

      this.houses.push(newRental);
      this.rentalForm.reset();
      this.showAddRentalForm = false;
    } else {
      alert('Merci de remplir tous les champs obligatoires.');
    }
  }

  rentHouse(house: House): void {
    if (house.status === 'Rented') {
      alert('Cette maison est déjà louée.');
      return;
    }

    house.status = 'Rented';
    alert(`Vous avez loué : ${house.title} pour $${house.price}/mois.`);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/rentaldetails', id]);
  }
}
