import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  favorites = [
    {
      fullName: 'John Doe',
      dateAdded: new Date(2024, 4, 12),
      rentalRef: 'REF12345',
      rentalLocation: 'Tunis',
      status: 'SOLDOUT'
    },
    {
      fullName: 'Jane Smith',
      dateAdded: new Date(2024, 5, 20),
      rentalRef: 'REF54321',
      rentalLocation: 'Sousse',
      status: 'AVAILABLE'
    },
    {
      fullName: 'Ahmed Ben Ali',
      dateAdded: new Date(2024, 6, 1),
      rentalRef: 'REF67890',
      rentalLocation: 'Sfax',
      status: 'AVAILABLE'
    },
    {
      fullName: 'Sara Boussad',
      dateAdded: new Date(2024, 3, 14),
      rentalRef: 'REF11223',
      rentalLocation: 'Monastir',
      status: 'AVAILABLE'
    },
    {
      fullName: 'Youssef Hammami',
      dateAdded: new Date(2024, 1, 22),
      rentalRef: 'REF99887',
      rentalLocation: 'Gabes',
      status: 'RENTED'
    },
    {
      fullName: 'Meriem Zaidi',
      dateAdded: new Date(2024, 0, 9),
      rentalRef: 'REF33445',
      rentalLocation: 'Bizerte',
      status: 'SOLDOUT'
    },
    {
      fullName: 'Nabil Mansour',
      dateAdded: new Date(2023, 11, 25),
      rentalRef: 'REF55667',
      rentalLocation: 'Kairouan',
      status: 'AVAILABLE'
    },
    {
      fullName: 'Amina Kallel',
      dateAdded: new Date(2024, 2, 17),
      rentalRef: 'REF77889',
      rentalLocation: 'Mahdia',
      status: 'RENTED'
    },
    {
      fullName: 'Hedi Larbi',
      dateAdded: new Date(2024, 4, 28),
      rentalRef: 'REF99001',
      rentalLocation: 'Sousse',
      status: 'AVAILABLE'
    },
    {
      fullName: 'Sabrine Trabelsi',
      dateAdded: new Date(2024, 6, 5),
      rentalRef: 'REF22334',
      rentalLocation: 'Tunis',
      status: 'SOLDOUT'
    }
  ];
}
