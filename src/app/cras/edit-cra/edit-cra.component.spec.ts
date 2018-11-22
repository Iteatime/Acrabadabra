import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Input} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title, By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { MockComponent } from 'ng-mocks';

import { CalendarComponent } from './calendar/calendar.component';
import { EditCraComponent } from './edit-cra.component';

import { Cra } from 'src/app/shared/cra.model';
import { SerializerService } from 'src/app/shared/serialization/serializer.service';

import { formData } from 'src/app/@types/formData';
import { CalendarEvent } from 'calendar-utils';


// tslint:disable-next-line:directive-selector
@Directive({ selector: '.modal' })
class MockModalDirective {
  @Input() toggled: boolean;
}

describe('EditCraComponent', () => {
  let fixture: ComponentFixture<EditCraComponent>;
  let component: EditCraComponent;
  let compiled: any;
  let route: ActivatedRoute;
  let serializer: SerializerService;
  let titleService: Title;
  let calendar: CalendarComponent;

  const testData: formData = {
          'mode': 'add',
          'cra': new Cra('tester@test.com', 'tester', 'Test.com',  'Testing'),
        },
        miniTimesheet = {
          '01.1900': [0, 1],
        },
        timesheet: CalendarEvent[] = [
          { title: '', start: new Date(1900, 0, 1, 0, 0, 0, 0), end: new Date(1900, 0, 1, 0, 0, 0, 0)},
          { title: '', start: new Date(1900, 0, 1, 0, 0, 0, 0), end: new Date(1900, 0, 1, 8, 0, 0, 0)},
        ];

  const testEditToken = 'eyJtb2RlIjoiZWRpdCIsImNyYSI6eyJjb25zdWx0YW50Ijp7ImVtYWlsIjoidGVzdGVy' +
                        'QHRlc3QuY29tIiwibmFtZSI6InRlc3RlciJ9LCJtaXNzaW9uIjp7ImNsaWVudCI6IlRl' +
                        'c3QuY29tIiwidGl0bGUiOiJUZXN0aW5nIn19fQ==';

  const testReviewToken = 'eyJtb2RlIjoicmV2aWV3IiwiY3JhIjp7ImNvbnN1bHRhbnQiOnsiZW1haWwiOiJ0ZXN0' +
                          'ZXJAdGVzdC5jb20iLCJuYW1lIjoidGVzdGVyIn0sIm1pc3Npb24iOnsiY2xpZW50Ijoi' +
                          'VGVzdC5jb20iLCJ0aXRsZSI6IlRlc3RpbmcifX19';

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [
        EditCraComponent,
        MockComponent(CalendarComponent),
        MockModalDirective
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCraComponent);
    component = fixture.componentInstance;
    testData.cra.timesheet = timesheet;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    serializer = fixture.debugElement.injector.get(SerializerService);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    titleService = fixture.debugElement.injector.get(Title);
    calendar = fixture.debugElement.query(By.css('app-calendar')).componentInstance as CalendarComponent;
    calendar.timesheet = timesheet;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should init the component', () => {
    const spyGetDataFromUrlParams = spyOn(component, 'getDataFromUrlParams'),
          spySetTitle = spyOn(component, 'setPageTitle');

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form).not.toBeUndefined();
    expect(spyGetDataFromUrlParams).toHaveBeenCalled();
    expect(spySetTitle).toHaveBeenCalled();
  });

  it('should switch mode when edit QueryParams provided', async(() => {
    testData.mode = 'edit';
    const spyDeserialize = spyOn(serializer, 'deserialize')
            .and.returnValue(testData),
          spySetTitle = spyOn(component, 'setPageTitle')
            .and.callFake((titleString: string) => {
              expect(titleString).toBe(component.title[testData.mode] + ' un compte rendu d\'activité');
            }),
          spySetInputsValue = spyOn(component, 'setInputsValue');
    route.queryParams = of({ data: testEditToken });
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.mode).toBe(testData.mode);
      expect(component.cra).toBe(testData.cra);
      expect(spyDeserialize).toHaveBeenCalled();
      expect(spySetTitle).toHaveBeenCalled();
      expect(spySetInputsValue).toHaveBeenCalled();
    });
  }));

  it('should switch mode when review QueryParams provided', async(() => {
    testData.mode = 'review';
    const spyDeserialize = spyOn(serializer, 'deserialize')
            .and.returnValue(testData),
          spySetTitle = spyOn(component, 'setPageTitle')
            .and.callFake((titleString: string) => {
              expect(titleString).toBe(component.title[testData.mode] + ' un compte rendu d\'activité');
            }),
          spyDisableInputs = spyOn(component, 'disableInputs'),
          spySetInputsValue = spyOn(component, 'setInputsValue');
    route.queryParams = of({ data: testReviewToken });
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.mode).toBe(testData.mode);
      expect(component.cra).toBe(testData.cra);
      expect(spyDisableInputs).toHaveBeenCalled();
      expect(spySetTitle).toHaveBeenCalled();
      expect(spySetInputsValue).toHaveBeenCalled();
    });
  }));

  it('should get data from URL params', async(() => {
    fixture.detectChanges();
    component.getDataFromUrlParams({});

    fixture.whenStable().then(() => {
      expect(component.mode).toBe(testData.mode);
      expect(component.cra).toEqual(new Cra());
    });
  }));

  it('should set page title', () => {
    testData.mode = 'add';
    const testTitle = 'test',
          appTitle = 'Acrabadabra',
          spySetTitle = spyOn(titleService, 'setTitle')
            .and.callFake((titleString: string) => {
              expect(titleString).toBe(appTitle + ' - ' + testTitle);
            }),
          spyGetTitle = spyOn(titleService, 'getTitle')
            .and.returnValue(appTitle);

    component.setPageTitle(testTitle);
  });

  it('should set inputs value', () => {
    component.setInputsValue(testData.cra);
    expect(component.consultantNameInput.value).toBe(testData.cra.consultant.name);
    expect(component.consultantEmailInput.value).toBe(testData.cra.consultant.email);
    expect(component.missionTitleInput.value).toBe(testData.cra.mission.title);
    expect(component.missionFinalClientInput.value).toBe(testData.cra.mission.client);
  });

  it('should set dom\'s inputs value', () => {
    component.setInputsValue(testData.cra);
    fixture.detectChanges();

    const consultantNameInputValue = compiled.querySelector('input[name="consultantNameInput"]').value;
    const consultantEmailInputValue = compiled.querySelector('input[name="consultantEmailInput"]').value;
    const missionTitleInputValue = compiled.querySelector('input[name="missionTitleInput"]').value;
    const missionFinalClientInputValue = compiled.querySelector('input[name="missionFinalClientInput"]').value;

    expect(consultantNameInputValue).toBe(testData.cra.consultant.name);
    expect(consultantEmailInputValue).toBe(testData.cra.consultant.email);
    expect(missionTitleInputValue).toBe(testData.cra.mission.title);
    expect(missionFinalClientInputValue).toBe(testData.cra.mission.client);
  });

  it('should disable inputs', () => {
    component.disableInputs();
    expect(component.consultantNameInput.disabled).toBeTruthy();
    expect(component.consultantEmailInput.disabled).toBeTruthy();
    expect(component.missionTitleInput.disabled).toBeTruthy();
    expect(component.missionFinalClientInput.disabled).toBeTruthy();
  });

  it('should enable modal on submit if the form is valid', () => {
    component.setInputsValue(testData.cra);
    fixture.detectChanges();
    component.onSubmitCRA();
    expect(component.showModal).toBeTruthy();
    expect(component.showErrorModal).not.toBeTruthy();
  });

  it('should enable error modal on submit if the form isn\'t valid', () => {
    testData.cra.consultant.name = '';
    component.setInputsValue(testData.cra);
    fixture.detectChanges();
    component.onSubmitCRA();
    expect(component.showModal).not.toBeTruthy();
    expect(component.showErrorModal).toBeTruthy();
  });

  it('should create the token', async(() => {
    component.cra = testData.cra;
    const spySerialize = spyOn(serializer, 'serialize')
      .and.returnValue(testEditToken);
    component.creatTokens();
    fixture.whenStable().then(() => {
      expect(component.editToken).toBe(testEditToken);
    });
  }));
});
