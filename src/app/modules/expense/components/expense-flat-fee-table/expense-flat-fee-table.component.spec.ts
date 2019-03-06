import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseFlatFeeTableComponent } from './expense-flat-fee-table.component';

describe('ExpenseFlatFeeTableComponent', () => {
  let component: ExpenseFlatFeeTableComponent;
  let fixture: ComponentFixture<ExpenseFlatFeeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseFlatFeeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseFlatFeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
