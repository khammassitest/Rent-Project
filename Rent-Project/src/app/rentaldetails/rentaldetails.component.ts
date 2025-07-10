import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../services/rental/rental.service';
import { Property } from '../models/property';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rental-details',
  templateUrl: './rentaldetails.component.html',
  styleUrls: ['./rentaldetails.component.css'],
  imports: [CommonModule]
})
export class RentalDetailsComponent implements OnInit {
  house: Property | undefined;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.rentalService.getProperty(id).subscribe({
        next: (property) => {
          this.house = property;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de la propriété', err);
        }
      });
    }
  }
}
