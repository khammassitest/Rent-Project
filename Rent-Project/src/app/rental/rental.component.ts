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
  editingProperty: Property | null = null;
  showAddRentalForm = false;
  rentalForm!: FormGroup;
  selectedFile: File | null = null;
  userId :any  

  editMode: boolean = false;
editingPropertyId: string | null = null;
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

  onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
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
      userId: this.userId.id
    };

    this.rentalService.createProperty(newProperty).subscribe({
      next: (created) => {
        const propertyId = created.id;

        // Upload image if selected
        if (this.selectedFile) {
          this.rentalService.uploadPhoto(propertyId, this.selectedFile).subscribe({
            next: () => {
              console.log('Image uploaded successfully');
              this.afterPropertyCreated();
            },
            error: (err) => {
              console.error('Erreur lors de l’upload de l’image', err);
              alert("Propriété ajoutée, mais l'image n'a pas pu être téléchargée.");
              this.afterPropertyCreated();
            }
          });
        } else {
          this.afterPropertyCreated();
        }
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

private afterPropertyCreated(): void {
  this.loadProperties();
  this.rentalForm.reset();
  this.selectedFile = null;
  this.showAddRentalForm = false;
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

  addToFavorite(property: Property) {
    alert('Propriété ajoutée aux favoris !');
  };

editProperty(property: any) {
  this.editMode = true;
  this.editingPropertyId = property.id;

  this.rentalForm.patchValue({
    description: property.description,
    address: property.address,
    zipCode: property.zipCode,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    squareFeet: property.squareFeet,
    lotSize: property.lotSize,
    yearBuilt: property.yearBuilt,
    propertyType: property.propertyType,
    floor: property.floor,
    totalFloors: property.totalFloors,
    hasGarage: property.hasGarage,
    garageSpaces: property.garageSpaces,
    hasBasement: property.hasBasement,
    hasPool: property.hasPool,
    hasElevator: property.hasElevator,
    furnished: property.furnished,
    condition: property.condition,
    heatingType: property.heatingType,
    coolingType: property.coolingType,
    latitude: property.latitude,
    longitude: property.longitude,
    userId: property.userId,
    status: property.status,
    listingDate: property.listingDate
  });
}
  
deleteProperty(property: Property): void {
  
  this.rentalService.deleteProperty(property.id).subscribe({
      next: () => {
        alert('Propriété supprimée avec succès.');
        this.loadProperties(); // Refresh the list
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert("Échec de la suppression.");
      }
    }); 
}

updateRental(): void {
  if (this.rentalForm.valid && this.editingPropertyId) {
    const updatedProperty: Property = {
      id: this.editingPropertyId,
      ...this.rentalForm.value,
      userId: this.userId.id,
    };

    this.rentalService.updateProperty(updatedProperty).subscribe({
      next: () => {
        if (this.selectedFile) {
          this.rentalService.uploadPhoto(this.editingPropertyId!, this.selectedFile).subscribe({
            next: () => {
              console.log('Photo updated');
              this.afterPropertyCreated();
            },
            error: (err) => {
              console.error('Image update failed', err);
              this.afterPropertyCreated();
            }
          });
        } else {
          this.afterPropertyCreated();
        }
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update property.');
      }
    });
  }
}



}