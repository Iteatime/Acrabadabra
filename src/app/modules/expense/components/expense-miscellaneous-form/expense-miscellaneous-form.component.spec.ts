import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMiscellaneousFormComponent } from './expense-miscellaneous-form.component';

describe('ExpenseMiscellaneousFormComponent', () => {
  let component: ExpenseMiscellaneousFormComponent;
  let fixture: ComponentFixture<ExpenseMiscellaneousFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseMiscellaneousFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseMiscellaneousFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
