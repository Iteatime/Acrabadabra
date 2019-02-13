import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMileageFormComponent } from './expense-mileage-form.component';
import { DomEventsPlugin } from '@angular/platform-browser/src/dom/events/dom_events';
import { TestabilityRegistry } from '@angular/core';

describe('ExpensesFormComponent', () => {
  let component: ExpenseMileageFormComponent;
  let fixture: ComponentFixture<ExpenseMileageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseMileageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseMileageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {

    beforeEach(() => {
      component.commute = {
        date: '',
        destination: '',
        distance: 6,
        allowance: 2,
        mileageAllowance: 0
      }
      component.onSubmit();
    });

    it('should set `submitted` true', () => {
      expect(component.submitted).toBeTruthy();
    });

    it('should return the result of multiplication `distance` by `allowance`', () => {
      expect(component.commute.mileageAllowance).toBe(12);
    });
  });
});

