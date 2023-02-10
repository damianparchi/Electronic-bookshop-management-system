import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrateComponent } from './userrate.component';

describe('UserrateComponent', () => {
  let component: UserrateComponent;
  let fixture: ComponentFixture<UserrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
