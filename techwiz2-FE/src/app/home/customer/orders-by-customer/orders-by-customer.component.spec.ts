import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByCustomerComponent } from './orders-by-customer.component';

describe('OrdersByCustomerComponent', () => {
  let component: OrdersByCustomerComponent;
  let fixture: ComponentFixture<OrdersByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersByCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
