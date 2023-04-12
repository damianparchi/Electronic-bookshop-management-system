import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSellComponent } from './admin-sell.component';

describe('AdminSellComponent', () => {
  let component: AdminSellComponent;
  let fixture: ComponentFixture<AdminSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
