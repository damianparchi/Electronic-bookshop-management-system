import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckouthistoryComponent } from './checkouthistory.component';

describe('CheckouthistoryComponent', () => {
  let component: CheckouthistoryComponent;
  let fixture: ComponentFixture<CheckouthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckouthistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckouthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
