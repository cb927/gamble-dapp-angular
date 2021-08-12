import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettledOfferComponent } from './settled-offer.component';

describe('SettledOfferComponent', () => {
  let component: SettledOfferComponent;
  let fixture: ComponentFixture<SettledOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettledOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettledOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
