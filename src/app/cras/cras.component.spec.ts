import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrasComponent } from './cras.component';

describe('CrasComponent', () => {
  let component: CrasComponent;
  let fixture: ComponentFixture<CrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
