import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMiscellaneousTableComponent } from './expense-miscellaneous-table.component';

describe('ExpenseMiscellaneousTableComponent', () => {
  let component: ExpenseMiscellaneousTableComponent;
  let fixture: ComponentFixture<ExpenseMiscellaneousTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseMiscellaneousTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseMiscellaneousTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
