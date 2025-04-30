import { Component } from '@angular/core';
import { RentalService } from '../services/rental/rental.service'; 
import { House } from '../models/rental';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental',
  standalone: false,
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent {
  houses: House[] = [];
  isAdmin = true; // Toggle this to false if needed

  constructor(private rentalService: RentalService,private router:Router) {
    this.houses = this.rentalService.houses;
  }

  // New rental object with all attributes
  newRental: House = {
    id: 0,
    etage: 0,
    reference: '',
    superficie: 0,
    nbpieces: 0,
    ville: '',
    rue: '',
    postal: '',
    title: '',
    description: '',
    price: 0,
    image: ''
  };

  showAddRentalForm = false;
  selectedHouse: House | null = null;

  viewDetails(house: House) {
    this.selectedHouse = house;
  }
  
  closeDetails() {
    this.selectedHouse = null;
  }
  
  
  toggleAddRentalForm() {
    this.showAddRentalForm = !this.showAddRentalForm;
  }

  addRental() {
    const requiredFields = [
      this.newRental.title,
      this.newRental.description,
      this.newRental.price,
      this.newRental.image,
      this.newRental.reference,
      this.newRental.ville,
      this.newRental.rue,
      this.newRental.postal,
      this.newRental.superficie,
      this.newRental.nbpieces,
      this.newRental.etage
    ];

    if (requiredFields.every(field => field !== '' && field !== null && field !== undefined)) {
      // Generate a unique ID
      const maxId = this.houses.length > 0 ? Math.max(...this.houses.map(h => h.id)) : 0;
      const newId = maxId + 1;

      const rentalToAdd: House = { ...this.newRental, id: newId };
      this.houses.push(rentalToAdd);

      // Reset form
      this.newRental = {
        id: 0,
        etage: 0,
        reference: '',
        superficie: 0,
        nbpieces: 0,
        ville: '',
        rue: '',
        postal: '',
        title: '',
        description: '',
        price: 0,
        image: ''
      };

      this.showAddRentalForm = false;
    } else {
      alert('Please fill in all fields.');
    }
  }
  goToDetails(id:any){
    this.router.navigate(['/rentaldetails',id])
  }

  rentHouse(house: any) {
    if (house.status === 'Loué') {
      alert('Cette maison est déjà louée.');
      return;
    }
  
    house.status = 'Loué'; // Mettre à jour le statut
    alert(`Vous avez loué : ${house.title} pour $${house.price}/mois.`);
  }
  
}
