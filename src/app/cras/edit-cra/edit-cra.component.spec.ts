import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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


describe('EditCraComponent - ', () => {
  let fixture: ComponentFixture<EditCraComponent>;
  let component: EditCraComponent;
  let compiled: any;
  let route: ActivatedRoute;
  let serializer: SerializerService;
  let titleService: Title;
  let calendar: CalendarComponent;

  const testData: formData = {
          'mode': 'add',
          cra: new Cra('tester@test.com', 'tester', 'Test.com', 'Testing')
        },
        timesheet: CalendarEvent[] = [
          { title: '', start: new Date(1900, 0, 1, 0, 0, 0, 0), end: new Date(1900, 0, 1, 4, 0, 0, 0)},
          { title: '', start: new Date(1900, 0, 2, 0, 0, 0, 0), end: new Date(1900, 0, 2, 8, 0, 0, 0)},
        ],
        testEditToken = 'eyJtb2RlIjoiZWRpdCIsImNyYSI6eyJjb25zdWx0YW50Ijp7ImVtYWlsIjoidGVzdGVyQH' +
                        'Rlc3QuY29tIiwibmFtZSI6IlRlc3RlciJ9LCJtaXNzaW9uIjp7ImNsaWVudCI6IlRlc3Qu' +
                        'Y29tIiwidGl0bGUiOiJUZXN0aW5nIn0sInRpbWVzaGVldCI6eyIwLjE5MDAiOlswLjUsMS' +
                        'wwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAs' +
                        'MCwwLDBdfX19',
        testReviewToken = 'eyJtb2RlIjoicmV2aWV3IiwiY3JhIjp7ImNvbnN1bHRhbnQiOnsiZW1haWwiOiJ0ZXN0ZX' +
                          'JAdGVzdC5jb20iLCJuYW1lIjoiVGVzdGVyIn0sIm1pc3Npb24iOnsiY2xpZW50IjoiVGVz' +
                          'dC5jb20iLCJ0aXRsZSI6IlRlc3RpbmcifSwidGltZXNoZWV0Ijp7IjAuMTkwMCI6WzAuNS' +
                          'wxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAs' +
                          'MCwwLDAsMF19fX0';
  testData.cra.timesheet = {
    '0.1900': [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

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

  describe('reading queryparams', () => {
    describe('when called in add mode:', () => {
      it('should set Acrabadabra - Saisir un compte rendu d\'activité as page title', () => {
        route.queryParams = of({});

        const spySetTitle = spyOn(titleService, 'setTitle');

        fixture.detectChanges();
        component.ngOnInit();

        expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Saisir un compte rendu d\'activité');
      });

      it('should init empty', () => {
        fixture.detectChanges();
        component.ngOnInit();

        expect(component.consultantNameInput.value).toBe('');
        expect(component.consultantEmailInput.value).toBe('');
        expect(component.missionTitleInput.value).toBe('');
        expect(component.missionFinalClientInput.value).toBe('');
        expect(component.mode).toBe(testData.mode);
        expect(component.cra).toEqual(new Cra());
      });
    });

    describe('when called in edit/review mode', () => {
      it('should init filled with token data', async(() => {
        testData.mode = 'edit';
        route.queryParams = of({ data: testEditToken });

        const spyDeserialize = spyOn(serializer, 'deserialize')
                .and.returnValue(testData);

        fixture.detectChanges();
        component.ngOnInit();

        fixture.whenStable().then(() => {
          expect(component.cra).toBe(testData.cra);
          expect(component.consultantNameInput.value).toBe(testData.cra.consultant.name);
          expect(component.consultantEmailInput.value).toBe(testData.cra.consultant.email);
          expect(component.missionTitleInput.value).toBe(testData.cra.mission.title);
          expect(component.missionFinalClientInput.value).toBe(testData.cra.mission.client);
          expect(spyDeserialize).toHaveBeenCalledWith(testEditToken);
        });
      }));
    });

    describe('when called in edit mode', () => {
      it('should set mode to edit', () => {
        testData.mode = 'edit';
        route.queryParams = of({ data: testEditToken });

        const spyDeserialize = spyOn(serializer, 'deserialize')
                .and.returnValue(testData);

        fixture.detectChanges();
        component.ngOnInit();

        expect(component.mode).toBe('edit');
        expect(spyDeserialize).toHaveBeenCalledWith(testEditToken);
      });

      it('should set Acrabadabra - Editer un compte rendu d\'activité as page title', () => {
        testData.mode = 'edit';
        route.queryParams = of({ data: testEditToken });

        const spySetTitle = spyOn(titleService, 'setTitle'),
              spyDeserialize = spyOn(serializer, 'deserialize')
                .and.returnValue(testData);

        fixture.detectChanges();
        component.ngOnInit();

        expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Editer un compte rendu d\'activité');
        expect(spyDeserialize).toHaveBeenCalledWith(testEditToken);
      });
    });

    describe('when called in review mode', () => {
      it('should set mode to review', () => {
        testData.mode = 'review';
        route.queryParams = of({ data: testReviewToken });

        const spyDeserialize = spyOn(serializer, 'deserialize')
                .and.returnValue(testData);

        fixture.detectChanges();
        component.ngOnInit();

        expect(component.mode).toBe(testData.mode);
        expect(spyDeserialize).toHaveBeenCalledWith(testReviewToken);
      });

      it('should set Acrabadabra - Consulter un compte rendu d\'activité as page title', () => {
        testData.mode = 'review';
        route.queryParams = of({ data: testReviewToken });

        const spySetTitle = spyOn(titleService, 'setTitle'),
              spyDeserialize = spyOn(serializer, 'deserialize')
                .and.returnValue(testData);

        fixture.detectChanges();
        component.ngOnInit();

        expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Consulter un compte rendu d\'activité');
        expect(spyDeserialize).toHaveBeenCalledWith(testReviewToken);
      });

      it('should disable form inputs', () => {
        testData.mode = 'review';
        route.queryParams = of({ data: testReviewToken });

        const spyDeserialize = spyOn(serializer, 'deserialize')
                .and.returnValue(testData);

        fixture.detectChanges();
        component.ngOnInit();

        expect(component.consultantNameInput.disabled).toBeTruthy();
        expect(component.consultantEmailInput.disabled).toBeTruthy();
        expect(component.missionTitleInput.disabled).toBeTruthy();
        expect(component.missionFinalClientInput.disabled).toBeTruthy();
        expect(spyDeserialize).toHaveBeenCalledWith(testReviewToken);
      });
    });
  });

  describe('when submiting', () => {
    describe('and the form is valid', () => {
      it('should enable modal', () => {
        component.setInputsValue(testData.cra);
        fixture.detectChanges();
        component.onSubmitCRA();

        expect(component.showModal).toBeTruthy();
        expect(component.showErrorModal).not.toBeTruthy();
      });
      it('should create edit and review tokens', () => {
        component.setInputsValue(testData.cra);
        component.cra = testData.cra;

        const spySerialize = spyOn(serializer, 'serialize')
                .and.returnValue(testEditToken);

        fixture.detectChanges();
        component.onSubmitCRA();

        expect(component.cra.consultant.name).toBe(testData.cra.consultant.name);
        expect(component.cra.consultant.email).toBe(testData.cra.consultant.email);
        expect(component.cra.mission.title).toBe(testData.cra.mission.title);
        expect(component.cra.mission.client).toBe(testData.cra.mission.client);
        component.cra.timesheet['0.1900'].forEach(element => {
          expect(component.cra.timesheet['0.1900'][element]).toBe(testData.cra.timesheet['0.1900'][element]);
        });
        expect(component.editToken).toBe(testEditToken);
        expect(spySerialize).toHaveBeenCalled();
      });
    });

    describe('and the form is not valid', () => {
      it('should enable error modal', () => {
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
    });
  });

  describe('when closing a modal', () => {
    it('should reset it\'s toggle', () => {
      component.showModal = true;

      fixture.detectChanges();
      component.onModalClose('showModal');

      expect(component.showModal).toBeFalsy();
    });
  });
});
