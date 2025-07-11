import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VisitService } from '../../../services/visite/visit.service';

@Component({
  selector: 'app-gestion-visites',
  standalone: true,
  templateUrl: './gestion-visites.component.html',
  styleUrls: ['./gestion-visites.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class GestionVisitesComponent implements OnInit {
  visites: any[] = [];
  selectedVisit: any = null;
  newDate: string = '';

  constructor(private visitService: VisitService) {}

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {
    this.visitService.getAll().subscribe({
      next: (data: any[]) => this.visites = data,
      error: (err: any) => console.error('Erreur chargement', err)
    });
  }

  updateStatus(visite: any, status: string) {
    const dto = {
      propertyId: visite.property.id,
      userId: visite.user.id,
      status: status,
      visitDate: visite.visitDate,
      createdAt: visite.createdAt
    };

    this.visitService.updateVisit(visite.id, dto).subscribe(() => {
      this.loadVisits();
    });
  }

  openReschedule(visite: any) {
    this.selectedVisit = visite;
    this.newDate = visite.visitDate?.substring(0, 10);
  }

  confirmReschedule() {
    if (!this.selectedVisit) return;

    const dto = {
      propertyId: this.selectedVisit.property.id,
      userId: this.selectedVisit.user.id,
      status: 'REPORTED',
      visitDate: this.newDate,
      createdAt: this.selectedVisit.createdAt
    };

    this.visitService.updateVisit(this.selectedVisit.id, dto).subscribe(() => {
      this.closeModal();
      this.loadVisits();
    });
  }

  closeModal() {
    this.selectedVisit = null;
    this.newDate = '';
  }
}
