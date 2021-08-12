import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOfferComponent } from './join-offer.component';

describe('JoinOfferComponent', () => {
  let component: JoinOfferComponent;
  let fixture: ComponentFixture<JoinOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
