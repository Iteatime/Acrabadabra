import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Acrabadabra'`, () => {
    expect(component.title).toEqual('Acrabadabra');
  });

  it('should render title in a h1 tag', () => {
    expect(compiled.querySelector('h1').textContent).toEqual('Acrabadabra');
  });

  it('should update the rendered title after a change', () => {
    component.title = 'Something else !';
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent).not.toEqual('Acrabadabra');
  });
});
