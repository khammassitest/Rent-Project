import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RentalService } from '../services/rental/rental.service';
import { Property } from '../models/property';
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
  properties: any[] = [];
  isAdmin = false;
  showAddRentalForm = false;
  rentalForm!: FormGroup;
  userId :any  
  constructor(
    private rentalService: RentalService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProperties();
     this.userService.getConnectedUser().subscribe(data=>{
              this.userId=data
          
            console.log(this.userId.id)
      }); // or set another way

    this.userService.getConnectedUser().subscribe({
      next: (user) => {
        this.isAdmin = user?.role === UserRole.ADMIN;
      },
      error: (err) => {
        console.error('Erreur récupération utilisateur connecté', err);
      }
    });

    this.rentalForm = this.fb.group({
  description: ['', Validators.required],
  address: ['', Validators.required],
  zipCode: [''],
  status: ['AVAILABLE'],
  userId: [''], // you can replace with dynamic ID
  listingDate: [new Date().toISOString()],
  bedrooms: [0],
  bathrooms: [0],
  squareFeet: [0],
  lotSize: [0],
  yearBuilt: [0],
  propertyType: ['Apartment'],
  floor: [0],
  totalFloors: [0],
  hasGarage: [false],
  garageSpaces: [0],
  hasBasement: [false],
  hasPool: [false],
  hasElevator: [false],
  furnished: [false],
  condition: [''],
  heatingType: ['None'],
  coolingType: ['None'],
  latitude: [0],
  longitude: [0],
  estimatedPrice: [0],
});

  }

  loadProperties(): void {
    this.rentalService.getProperties().subscribe({
      next: (data: any) => {
        this.properties = data.$values;
        console.log(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des propriétés', err);
      }
    });
  }

  toggleAddRentalForm(): void {
    this.showAddRentalForm = !this.showAddRentalForm;
  }

  addRental(): void {
    if (this.rentalForm.valid) {
      const formValue = this.rentalForm.value;
      const newProperty: Partial<Property> = {
        ...formValue,
        userId:this.userId.id
        
      };
      console.log(newProperty)
      this.rentalService.createProperty(newProperty).subscribe({
        next: (created) => {
          this.loadProperties()
          this.rentalForm.reset();
          this.showAddRentalForm = false;
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout de la propriété', err);
          alert("Erreur lors de l’ajout.");
        }
      });
    } else {
      alert('Merci de remplir tous les champs obligatoires.');
    }
  }

  rentHouse(property: Property): void {
    if (property.status === 1) {
      alert('Cette maison est déjà louée.');
      return;
    }

    const updatedProperty: Property = {
      ...property,
      status: 1 // 1 = RENTED
    };

    this.rentalService.updateProperty(updatedProperty).subscribe({
      next: () => {
        property.status = 1;
        alert(`Vous avez loué : ${property.description} pour $${property.estimatedPrice}/mois.`);
      },
      error: (err) => {
        console.error('Erreur de mise à jour', err);
        alert("Échec de la mise à jour.");
      }
    });
  }

  goToDetails(id: string): void {
    this.router.navigate(['/rentaldetails', id]);
  }
}
