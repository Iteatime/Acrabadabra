import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMileageTableComponent } from './expense-mileage-table.component';

describe('TableAllowanceComponent', () => {
  let component: ExpenseMileageTableComponent;
  let fixture: ComponentFixture<ExpenseMileageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseMileageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseMileageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
