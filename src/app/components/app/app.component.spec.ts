import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NotificationsComponent } from 'src/app/modules/notification/components/notifications/notifications.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  // Here we create a testing instance of the component we are testing !
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NotificationsComponent
      ],
    }).compileComponents();
  }));

  // Here we initialize variables to access the component instance and template
  beforeEach(
    () => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
