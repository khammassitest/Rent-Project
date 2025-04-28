import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountresComponent } from './countres.component';

describe('CountresComponent', () => {
  let component: CountresComponent;
  let fixture: ComponentFixture<CountresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
