import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseFlatFeeFormComponent } from './expense-flat-fee-form.component';

describe('ExpenseFlatFeeFormComponent', () => {
  let component: ExpenseFlatFeeFormComponent;
  let fixture: ComponentFixture<ExpenseFlatFeeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseFlatFeeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseFlatFeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
