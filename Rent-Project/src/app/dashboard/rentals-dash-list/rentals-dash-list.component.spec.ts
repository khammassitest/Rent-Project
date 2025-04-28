import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsDashListComponent } from './rentals-dash-list.component';

describe('RentalsDashListComponent', () => {
  let component: RentalsDashListComponent;
  let fixture: ComponentFixture<RentalsDashListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalsDashListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalsDashListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
