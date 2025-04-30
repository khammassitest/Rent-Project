import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { House } from '../models/rental';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../services/rental/rental.service';

@Component({
  selector: 'app-rentaldetails',
  standalone: false,
  templateUrl: './rentaldetails.component.html',
  styleUrl: './rentaldetails.component.css'
})
export class RentaldetailsComponent implements OnInit {
  house!: House | undefined;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    
    this.house = this.rentalService.houses.find(h => h.id === id);
  }
}
