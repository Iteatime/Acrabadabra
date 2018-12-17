import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponentComponent } from './review.component';

describe('ReviewComponentComponent', () => {
  let component: ReviewComponentComponent;
  let fixture: ComponentFixture<ReviewComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
