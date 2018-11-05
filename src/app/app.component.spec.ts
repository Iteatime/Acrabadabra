import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: any;

  // Here we create a testing instance of the component we are testing !
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  // Here we initialize variables to access the component instance and template
  beforeEach(
    () => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
    }
  );

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Acrabadabra'`, () => {
    expect(app.title).toEqual('Acrabadabra');
  });

  it('should render title in a h1 tag', () => {
    expect(compiled.querySelector('h1').textContent).toEqual('Acrabadabra');
  });

  it('should update the rendered title after a change', () => {
    app.title = 'Something else !';
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent).not.toEqual('Acrabadabra');
  });
});
