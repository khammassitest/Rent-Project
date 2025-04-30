import { Component } from '@angular/core';
@Component({
  selector: 'app-rental',
  standalone: false,
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent {
  houses = [
    {
      title: '2BHK in Downtown',
      description: 'Spacious and modern apartment with balcony and great views.',
      price: 1200,
      image: 'rentals/1.jpg'
    },
    {
      title: 'Cozy Studio',
      description: 'Ideal for singles or students. Compact and affordable.',
      price: 800,
      image: 'rentals/2.jpg'
    },
    {
      title: '3BHK Family Home',
      description: 'Perfect for families, with a backyard and garage.',
      price: 1500,
      image: 'rentals/3.jpg'
    },
    {
      title: 'Luxury Penthouse',
      description: 'Top floor with panoramic city views and private elevator.',
      price: 3500,
      image: 'rentals/4.jpg'
    },
    {
      title: 'Suburban 1BHK',
      description: 'Quiet neighborhood, near public transport.',
      price: 950,
      image: 'rentals/5.jpg'
    },
    {
      title: 'Furnished 2BHK near University',
      description: 'Ideal for students, includes internet and utilities.',
      price: 1100,
      image: 'rentals/2.jpg'
    },
    {
      title: 'Rustic Cottage',
      description: 'Countryside charm with modern amenities.',
      price: 1300,
      image: 'rentals/3.jpg'
    },
    {
      title: 'Modern Loft',
      description: 'Open-concept layout, exposed brick, great for creatives.',
      price: 1600,
      image: 'rentals/4.jpg'
    },
    {
      title: 'Beachside Villa',
      description: 'Steps away from the beach, includes private pool.',
      price: 4000,
      image: 'rentals/1.jpg'
    },
    {
      title: 'Budget Room in Shared House',
      description: 'Private room with shared kitchen and bathroom.',
      price: 500,
      image: 'rentals/1.jpg'
    }
  ];

  isAdmin = false;


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
