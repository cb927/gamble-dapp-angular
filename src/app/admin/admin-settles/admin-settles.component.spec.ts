import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettlesComponent } from './admin-settles.component';

describe('AdminSettlesComponent', () => {
  let component: AdminSettlesComponent;
  let fixture: ComponentFixture<AdminSettlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSettlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
