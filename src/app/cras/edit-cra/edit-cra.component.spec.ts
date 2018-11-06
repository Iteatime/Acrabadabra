import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCraComponent } from './edit-cra.component';

describe('EditCraComponent', () => {
  let component: EditCraComponent;
  let fixture: ComponentFixture<EditCraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
