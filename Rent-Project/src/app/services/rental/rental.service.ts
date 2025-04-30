import { Injectable } from '@angular/core';
import { House } from '../../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  public houses: House[] = [
    {
      id: 1,
      etage: 2,
      reference: 'APT-DT-001',
      superficie: 80,
      nbpieces: 3,
      ville: 'Downtown',
      rue: 'Main St',
      postal: '10001',
      title: '2BHK in Downtown',
      description: 'Spacious and modern apartment with balcony and great views.',
      price: 1200,
      image: 'rentals/1.jpg',
      status: 'Disponible'
    },
    {
      id: 2,
      etage: 1,
      reference: 'STU-002',
      superficie: 35,
      nbpieces: 1,
      ville: 'City Center',
      rue: '2nd Ave',
      postal: '10002',
      title: 'Cozy Studio',
      description: 'Ideal for singles or students. Compact and affordable.',
      price: 800,
      image: 'rentals/2.jpg',
      status: 'Loué'
    },
    {
      id: 3,
      etage: 0,
      reference: 'FAM-003',
      superficie: 120,
      nbpieces: 5,
      ville: 'Suburbia',
      rue: 'Elm Street',
      postal: '10003',
      title: '3BHK Family Home',
      description: 'Perfect for families, with a backyard and garage.',
      price: 1500,
      image: 'rentals/3.jpg',
      status: 'Disponible'
    },
    {
      id: 4,
      etage: 10,
      reference: 'PENT-004',
      superficie: 150,
      nbpieces: 4,
      ville: 'Downtown',
      rue: 'Skyline Blvd',
      postal: '10004',
      title: 'Luxury Penthouse',
      description: 'Top floor with panoramic city views and private elevator.',
      price: 3500,
      image: 'rentals/4.jpg',
      status: 'Loué'
    },
    {
      id: 5,
      etage: 1,
      reference: 'SUB-005',
      superficie: 60,
      nbpieces: 2,
      ville: 'Greenfield',
      rue: 'Maple Road',
      postal: '10005',
      title: 'Suburban 1BHK',
      description: 'Quiet neighborhood, near public transport.',
      price: 950,
      image: 'rentals/5.jpg',
      status: 'Disponible'
    },
    {
      id: 6,
      etage: 3,
      reference: 'UNI-006',
      superficie: 75,
      nbpieces: 3,
      ville: 'University Town',
      rue: 'Campus Way',
      postal: '10006',
      title: 'Furnished 2BHK near University',
      description: 'Ideal for students, includes internet and utilities.',
      price: 1100,
      image: 'rentals/2.jpg',
      status: 'Loué'
    },
    {
      id: 7,
      etage: 1,
      reference: 'COT-007',
      superficie: 90,
      nbpieces: 3,
      ville: 'Countryside',
      rue: 'Hilltop Lane',
      postal: '10007',
      title: 'Rustic Cottage',
      description: 'Countryside charm with modern amenities.',
      price: 1300,
      image: 'rentals/3.jpg',
      status: 'Disponible'
    },
    {
      id: 8,
      etage: 4,
      reference: 'LOFT-008',
      superficie: 85,
      nbpieces: 2,
      ville: 'Art District',
      rue: 'Creative Alley',
      postal: '10008',
      title: 'Modern Loft',
      description: 'Open-concept layout, exposed brick, great for creatives.',
      price: 1600,
      image: 'rentals/4.jpg',
      status: 'Loué'
    },
    {
      id: 9,
      etage: 0,
      reference: 'VILLA-009',
      superficie: 200,
      nbpieces: 6,
      ville: 'Beachside',
      rue: 'Ocean Drive',
      postal: '10009',
      title: 'Beachside Villa',
      description: 'Steps away from the beach, includes private pool.',
      price: 4000,
      image: 'rentals/1.jpg',
      status: 'Disponible'
    },
    {
      id: 10,
      etage: 2,
      reference: 'ROOM-010',
      superficie: 20,
      nbpieces: 1,
      ville: 'Shared Housing Area',
      rue: 'Budget Lane',
      postal: '10010',
      title: 'Budget Room in Shared House',
      description: 'Private room with shared kitchen and bathroom.',
      price: 500,
      image: 'rentals/1.jpg',
      status: 'Loué'
    }
  ];
  
  constructor() { }
}
