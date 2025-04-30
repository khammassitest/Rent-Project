import { Component } from '@angular/core';
import { RentalService } from '../services/rental/rental.service'; 
import { House } from '../models/rental';

@Component({
  selector: 'app-rental',
  standalone: false,
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent {
  houses: House[] = [];
  isAdmin = false;

  constructor(private rentalService: RentalService) {
    this.houses = this.rentalService.houses; // ✅ bind data from service
  }


  newRental = {
    title: '',
    description: '',
    price: 0,
    image: ''
  };

  // Boolean to show/hide the rental form
  showAddRentalForm = false;

  // Toggle the form visibility
  toggleAddRentalForm() {
    this.showAddRentalForm = !this.showAddRentalForm;
  }

  // Add a new rental to the list
  addRental() {
    if (this.newRental.title && this.newRental.description && this.newRental.price && this.newRental.image) {
      this.houses.push({ ...this.newRental });
      // Reset the form
      this.newRental = { title: '', description: '', price: 0, image: '' };
      this.showAddRentalForm = false; // Hide the form after submission
    } else {
      alert('Please fill all fields');
    }
  }

  // Rent a house (existing logic)
  rentHouse(house: any) {
    alert(`You selected to rent: ${house.title} for $${house.price}/month`);
  }
}
