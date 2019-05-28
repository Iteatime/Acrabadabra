import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionEditComponent } from './mission-edit.component';

describe('MissionEditComponent', () => {
  let component: MissionEditComponent;
  let fixture: ComponentFixture<MissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
