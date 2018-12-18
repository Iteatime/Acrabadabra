import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTimesheetComponent } from './review-timesheet.component';

describe('ReviewTimesheetComponent', () => {
  let component: ReviewTimesheetComponent;
  let fixture: ComponentFixture<ReviewTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
