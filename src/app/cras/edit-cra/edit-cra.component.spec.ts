import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Input} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title, By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { MockComponent, MockDirective,  } from 'ng-mocks';

import { CalendarComponent } from './calendar/calendar.component';
import { EditCraComponent } from './edit-cra.component';

import { Cra } from 'src/app/shared/cra.model';
import { ModalDirective } from 'src/app/shared/style/modal.directive';
import { SerializerService } from 'src/app/shared/serialization/serializer.service';

import { formData } from 'src/app/@types/formData';
import { CalendarEvent } from 'calendar-utils';


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
          '0.1900': [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        timesheet: CalendarEvent[] = [
          { title: '', start: new Date(1900, 0, 1, 0, 0, 0, 0), end: new Date(1900, 0, 1, 4, 0, 0, 0)},
          { title: '', start: new Date(1900, 0, 2, 0, 0, 0, 0), end: new Date(1900, 0, 2, 8, 0, 0, 0)},
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
        MockDirective(ModalDirective)
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

  it('should set page title', () => {
    testData.mode = 'add';

    const testTitle = 'test',
          spySetTitle = spyOn(titleService, 'setTitle')
            .and.callFake((titleString: string) => {
              expect(titleString).toBe('Acrabadabra - ' + testTitle);
            });

    component.setPageTitle(testTitle);

    expect(spySetTitle).toHaveBeenCalled();
  });

  it('should switch to add mode whene no QueryParams provided', async(() => {
    fixture.detectChanges();
    component.getDataFromUrlParams({});

    fixture.whenStable().then(() => {
      expect(component.mode).toBe(testData.mode);
      expect(component.cra).toEqual(new Cra());
    });
  }));

  it('should switch mode when edit QueryParams provided', async(() => {
    testData.mode = 'edit';

    const spyDeserialize = spyOn(serializer, 'deserialize')
            .and.returnValue(testData),
          spySetInputsValue = spyOn(component, 'setInputsValue');

    fixture.detectChanges();
    component.getDataFromUrlParams({ data: testEditToken });

    fixture.whenStable().then(() => {
      expect(component.mode).toBe(testData.mode);
      expect(component.cra).toBe(testData.cra);
      expect(spyDeserialize).toHaveBeenCalled();
      expect(spySetInputsValue).toHaveBeenCalled();
    });
  }));

  it('should switch mode when review QueryParams provided', async(() => {
    testData.mode = 'review';

    const spyDeserialize = spyOn(serializer, 'deserialize')
            .and.returnValue(testData),
          spyDisableInputs = spyOn(component, 'disableInputs'),
          spySetInputsValue = spyOn(component, 'setInputsValue');

    route.queryParams = of({ data: testReviewToken });
    fixture.detectChanges();
    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(component.mode).toBe(testData.mode);
      expect(component.cra).toBe(testData.cra);
      expect(spyDeserialize).toHaveBeenCalled();
      expect(spyDisableInputs).toHaveBeenCalled();
      expect(spySetInputsValue).toHaveBeenCalled();
    });
  }));

  it('should disable inputs', () => {
    component.disableInputs();

    expect(component.consultantNameInput.disabled).toBeTruthy();
    expect(component.consultantEmailInput.disabled).toBeTruthy();
    expect(component.missionTitleInput.disabled).toBeTruthy();
    expect(component.missionFinalClientInput.disabled).toBeTruthy();
  });

  it('should set inputs value', () => {
    component.setInputsValue(testData.cra);

    expect(component.consultantNameInput.value).toBe(testData.cra.consultant.name);
    expect(component.consultantEmailInput.value).toBe(testData.cra.consultant.email);
    expect(component.missionTitleInput.value).toBe(testData.cra.mission.title);
    expect(component.missionFinalClientInput.value).toBe(testData.cra.mission.client);
  });

  it('should render inputs value', () => {
    component.setInputsValue(testData.cra);
    fixture.detectChanges();

    const consultantNameInputValue = compiled.querySelector('input[name="consultantNameInput"]').value,
          consultantEmailInputValue = compiled.querySelector('input[name="consultantEmailInput"]').value,
          missionTitleInputValue = compiled.querySelector('input[name="missionTitleInput"]').value,
          missionFinalClientInputValue = compiled.querySelector('input[name="missionFinalClientInput"]').value;

    expect(consultantNameInputValue).toBe(testData.cra.consultant.name);
    expect(consultantEmailInputValue).toBe(testData.cra.consultant.email);
    expect(missionTitleInputValue).toBe(testData.cra.mission.title);
    expect(missionFinalClientInputValue).toBe(testData.cra.mission.client);
  });

  it('should enable modal on submit if the form is valid', () => {
    const spyCreateCRA = spyOn(component, 'createCRA'),
          spyCreatTokens = spyOn(component, 'creatTokens');

    component.setInputsValue(testData.cra);
    fixture.detectChanges();
    component.onSubmitCRA();

    expect(component.showModal).toBeTruthy();
    expect(component.showErrorModal).not.toBeTruthy();
    expect(spyCreateCRA).toHaveBeenCalled();
    expect(spyCreatTokens).toHaveBeenCalled();
  });

  it('should enable error modal on submit if the form is not valid', () => {
    const spyShowValidationMessages = spyOn(component, 'showValidationMessages');

    component.setInputsValue(new Cra());
    fixture.detectChanges();
    component.onSubmitCRA();

    expect(component.showModal).not.toBeTruthy();
    expect(component.showErrorModal).toBeTruthy();
    expect(spyShowValidationMessages).toHaveBeenCalled();
  });

  it('should show validation messages', () => {
    const consultantNameInputValidationDiv = compiled.querySelector('input[name="consultantNameInput"]').nextSibling,
          consultantEmailInputValidationDiv = compiled.querySelector('input[name="consultantEmailInput"]').nextSibling,
          missionTitleInputValidationDiv = compiled.querySelector('input[name="missionTitleInput"]').nextSibling,
          missionFinalClientInputValidationDiv = compiled.querySelector('input[name="missionFinalClientInput"]').nextSibling;

    component.setInputsValue(new Cra());
    fixture.detectChanges();
    component.showValidationMessages();

    expect(component.consultantNameInput.errors).not.toEqual([]);
    expect(consultantNameInputValidationDiv.nodeName).not.toBe('div');
    expect(consultantEmailInputValidationDiv.nodeName).not.toBe('div');
    expect(missionTitleInputValidationDiv.nodeName).not.toBe('div');
    expect(missionFinalClientInputValidationDiv.nodeName).not.toBe('div');
  });

  it('should create the cra from the form value', () => {
    testData.cra.timesheet = miniTimesheet;
    component.setInputsValue(testData.cra);

    const spyMinifyTimesheet = spyOn(component, 'minifyTimesheet')
            .and.returnValue(miniTimesheet);

    fixture.detectChanges();
    component.createCRA();

    expect(component.cra).toEqual(testData.cra);
    expect(spyMinifyTimesheet).toHaveBeenCalled();
  });

  it('should create the token', async(() => {
    component.cra = testData.cra;

    const spySerialize = spyOn(serializer, 'serialize')
            .and.returnValue(testEditToken);

    component.creatTokens();

    fixture.whenStable().then(() => {
      expect(component.editToken).toBe(testEditToken);
      expect(spySerialize).toHaveBeenCalled();
    });
  }));

  it('should minify the timesheet', () => {
    const minifiedTimesheet = component.minifyTimesheet(timesheet);

    expect(minifiedTimesheet).toEqual(miniTimesheet);
  });

  it('should reset the toggle of the modal that has just been closed', () => {
    component.showModal = true;

    fixture.detectChanges();
    component.onModalClose('showModal');

    expect(component.showModal).toBeFalsy();
  });

});
