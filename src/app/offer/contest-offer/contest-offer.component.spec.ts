import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestOfferComponent } from './contest-offer.component';

describe('ContestOfferComponent', () => {
  let component: ContestOfferComponent;
  let fixture: ComponentFixture<ContestOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
