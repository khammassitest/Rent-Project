import { Injectable } from '@angular/core';
import { House } from '../../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  public houses: House[]=
  [
    
  { //id
    //reference
    //superficie
    //nbpieces
    //ville 
    //rue
    //postal
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

  ]
  constructor() { }
}
