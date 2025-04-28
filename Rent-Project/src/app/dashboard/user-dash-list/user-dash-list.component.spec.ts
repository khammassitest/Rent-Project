import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashListComponent } from './user-dash-list.component';

describe('UserDashListComponent', () => {
  let component: UserDashListComponent;
  let fixture: ComponentFixture<UserDashListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
