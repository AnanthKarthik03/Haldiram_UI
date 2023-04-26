import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDiscountsComponent } from './customer-discounts.component';

describe('CustomerDiscountsComponent', () => {
  let component: CustomerDiscountsComponent;
  let fixture: ComponentFixture<CustomerDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDiscountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
