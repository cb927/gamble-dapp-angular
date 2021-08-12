import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOfferComponent } from './set-offer.component';

describe('SetOfferComponent', () => {
  let component: SetOfferComponent;
  let fixture: ComponentFixture<SetOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
