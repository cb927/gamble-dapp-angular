import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettleComponent } from './admin-settle.component';

describe('AdminSettleComponent', () => {
  let component: AdminSettleComponent;
  let fixture: ComponentFixture<AdminSettleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSettleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
