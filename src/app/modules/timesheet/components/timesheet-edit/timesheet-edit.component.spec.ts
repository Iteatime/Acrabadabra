import { ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';

import { MockComponent, MockDirective } from 'ng-mocks';

import { CalendarSelectorComponent } from 'src/app/modules/calendar/components/calendar-selector/calendar-selector.component';

import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { TimesheetEditComponent } from './timesheet-edit.component';
import { TimesheetService } from '../../timesheet.service';

import { CopyToClipboardDirective } from 'src/app/shared/directives/copy-to-clipboard/copy-to-clipboard.directive';
import { MailtoDirective } from 'src/app/shared/directives/mailto/mailto.directive';

import { Timesheet } from 'src/app/shared/models/timesheet.model';
import { Invoice } from 'src/app/shared/models/invoice.model';
import { ReviewMail } from 'src/app/shared/models/review-mail.model';

let testTimesheet = new Timesheet('test');
    testTimesheet.workingDays['0.1900'] = [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    testTimesheet.invoice = new Invoice('F190001-01');
const testEditTokenWithoutInvoice = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: new Timesheet('test') }))));
const testEditTokenWithInvoice = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: testTimesheet }))));
const testReviewToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet: testTimesheet }))));

class MockCalendarManagerService {
  getWorkingDays(): any {
    return testTimesheet.workingDays;
  }

  getWorkedTime(): number {
    return 1.5;
  }
}

describe('TimesheetEditComponent', () => {
  let component: TimesheetEditComponent;
  let fixture: ComponentFixture<TimesheetEditComponent>;
  let titleService: Title;
  let route: ActivatedRoute;
  let router: Router;
  let timesheetService: TimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'timesheet/create', component: TimesheetEditComponent },
        ]),
      ],
      declarations: [
        TimesheetEditComponent,
        MockComponent(CalendarSelectorComponent),
        MockComponent(InvoiceFormComponent),
        MockDirective(CopyToClipboardDirective),
        MockDirective(MailtoDirective)
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} }
          }
        },
        { provide: CalendarManagerService, useClass: MockCalendarManagerService },
        TimesheetService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetEditComponent);
    component = fixture.componentInstance;

    titleService = TestBed.get(Title);
    timesheetService = TestBed.get(TimesheetService);
    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(titleService, 'setTitle').and.callThrough();
    });

    describe('When there is no `data` parameter', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should create a new Timesheet instance', () => {
        expect(timesheetService.timesheet.consultant.email).toBe('');
      });

      testValueChanges();
    });

    describe('When there is a `data` parameter', () => {
      describe('and the `mode` stored in the token is "edit"', () => {
        beforeEach(() => {
          route.snapshot.params = { data: testEditTokenWithInvoice };
          fixture.detectChanges();
        });

        it('should set `showLinks` to true', () => {
          expect(component.showLinks).toBeTruthy();
        });

        it('should set `generateInvoice` to true if `timesheet.invoice` contain an `Invoice` instance', () => {
          expect(component.generateInvoice).toBeTruthy();
        });

        it('should set `generateInvoice` to false otherwise', () => {
          fixture = TestBed.createComponent(TimesheetEditComponent);
          component = fixture.componentInstance;
          timesheetService = TestBed.get(TimesheetService);
          route = TestBed.get(ActivatedRoute);
          route.snapshot.params = { data: undefined };
          fixture.detectChanges();

          expect(component.generateInvoice).toBeFalsy();
        });

        testUpdateMailtoLink();

        testValueChanges();
      });

      describe('and the `mode` stored in the token is not "edit"', () => {
        beforeEach(() => {
          route.snapshot.params = { data: testReviewToken };
          spyOn(router, 'navigate').and.callThrough();
          fixture.detectChanges();
        });

        it('should navigate to the "create" URL', () => {
          expect(router.navigate).toHaveBeenCalledWith(['timesheet', 'create']);
        });
      });
    });

    it('should set "Acrabadabra - Saisir un compte rendu d\'activité" as page title if `mode` is not "edit"', () => {
      fixture.detectChanges();
      expect(titleService.setTitle).toHaveBeenCalledWith('Acrabadabra - Saisir un compte rendu d\'activité');
    });

    it('should set "Acrabadabra - Modifier un compte rendu d\'activité" as page title if `mode` is "edit"', () => {

      route.snapshot.params = { data: testEditTokenWithInvoice };
      fixture.detectChanges();
      expect(titleService.setTitle).toHaveBeenCalledWith('Acrabadabra - Modifier un compte rendu d\'activité');
    });
  });

  describe('getModeTitle()', () => {
    it('should return "Saisir" if `mode` is not "edit"', () => {
      expect(component.getModeTitle()).toBe('Saisir');
    });

    it('should return "Modifier" if `mode` is "edit"', () => {
      timesheetService.mode = 'edit';
      expect(component.getModeTitle()).toBe('Modifier');
    });
  });

  describe('onUserInput()', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    testOnUpdateInput();
  });

  describe('onSubmit()', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    describe('when the forms are valid', () => {
      beforeEach(async() => {
        await fixture.whenStable;
        spyOn(component, 'checkFormsValidity').and.returnValue(true);
        component.onSubmit();
      });

      it('should update the `workingDays` value', async() => {
        expect(timesheetService.timesheet.workingDays).toBe(testTimesheet.workingDays);
      });

      it('should set the invoice to null if `generateInvoice` is false', () => {
        expect(timesheetService.timesheet.invoice).toBeNull();
      });

      it('should update the invoice if `generateInvoice` is true', () => {
        route.snapshot.params = { data: testEditTokenWithInvoice };
        component.ngOnInit();
        fixture.detectChanges();
        component.onSubmit();
        expect(timesheetService.timesheet.invoice.number).toBe(testTimesheet.invoice.number);
      });

      testUpdateMailtoLink();

      it('should show the links', () => {
        expect(component.showLinks).toBeTruthy();
      });

      it('should set the `submitMessage.text` to "Si vous modifiez le CRA, vous devrez le valider à nouveau et utiliser le nouveau lien de partage."', () => {
        expect(component.submitMessage.text).toBe('Si vous modifiez le CRA, vous devrez le valider à nouveau et utiliser le nouveau lien de partage.');
      });

      it('should set the `submitMessage.type` to "success"', () => {
        expect(component.submitMessage.type).toBe('success');
      });
    });

    describe('when the forms aren\'t valid', () => {
      beforeEach(async() => {
        await fixture.whenStable;
        spyOn(component, 'checkFormsValidity').and.returnValue(false);
        component.onSubmit();
      });

      it('should mark the form as touched', () => {
        expect(component.form.touched).toBeTruthy();
      });

      it('should set the invalid field `status` to "INVALID"', () => {
        expect(component.form.form.get('consultantEmailInput').status).toBe('INVALID');
      });

      it('shouldn\'t show the links', () => {
        expect(component.showLinks).toBeFalsy();
      });

      it('should set the `submitMessage.text` to "Veuillez vérifier votre saisie"', () => {
        expect(component.submitMessage.text).toBe('Veuillez vérifier votre saisie');
      });

      it('should set the `submitMessage.type` to "error"', () => {
        expect(component.submitMessage.type).toBe('error');
      });
    });
  });

  describe('checkFormsValidity()', () => {
    beforeEach(async() => {
      await fixture.whenStable;
      component.submitMessage = null;
      component.showLinks = null;
    });

    describe('when `generateInvoice` is set to true', () => {
      beforeEach(() => {
        component.generateInvoice = true;
        fixture.detectChanges();
        component.invoiceForm.form = new NgForm(undefined, undefined);
      });

      it('should return true if the two `forms` are valid', () => {
        spyOnProperty(component.form, 'valid').and.returnValue(true);
        spyOnProperty(component.invoiceForm.form, 'valid').and.returnValue(true);
        expect(component.checkFormsValidity()).toBeTruthy();
      });

      it('should return false the timesheet `form` is invalid', () => {
        spyOnProperty(component.form, 'valid').and.returnValue(false);
        spyOnProperty(component.invoiceForm.form, 'valid').and.returnValue(true);
        expect(component.checkFormsValidity()).toBeFalsy();
      });

      it('should return false the invoice `form` is invalid', () => {
        spyOnProperty(component.form, 'valid').and.returnValue(true);
        spyOnProperty(component.invoiceForm.form, 'valid').and.returnValue(false);
        expect(component.checkFormsValidity()).toBeFalsy();
      });

      it('should return false the two `form` are invalid', () => {
        spyOnProperty(component.form, 'valid').and.returnValue(false);
        spyOnProperty(component.invoiceForm.form, 'valid').and.returnValue(false);
        expect(component.checkFormsValidity()).toBeFalsy();
      });
    });

    describe('when `generateInvoice` is set to false', () => {
      it('should return true if the `forms` is valid', () => {
        spyOnProperty(component.form, 'valid').and.returnValue(true);
        expect(component.checkFormsValidity()).toBeTruthy();
      });

      it('should return false if the `forms` is invalid', () => {
        spyOnProperty(component.form, 'valid').and.returnValue(false);
        expect(component.checkFormsValidity()).toBeFalsy();
      });
    });
  });

  function testValueChanges() {
    describe('on any input value change', () => {
      beforeEach(async() => {
      await fixture.whenStable;

      component.form.form.markAsDirty();
      component.form.form.get('consultantEmailInput').setValue('test');
      });

      testOnUpdateInput();
    });
  }

  function testOnUpdateInput() {
    it('should hide links', () => {
      expect(component.showLinks).toBeFalsy();
    });

    it('should hide the submit message', () => {
      expect(component.submitMessage).toBeNull();
    });
  }

  function testUpdateMailtoLink() {
    it('should create an instance of ReviewMail', () => {
      expect(component.reviewMail instanceof ReviewMail).toBeTruthy();
    });
  }
});
