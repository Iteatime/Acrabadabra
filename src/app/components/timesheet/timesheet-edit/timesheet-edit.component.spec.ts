import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, NgModel, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Title, By } from '@angular/platform-browser';

import { MockComponent, MockDirective } from 'ng-mocks';

import { TimesheetEditComponent } from './timesheet-edit.component';
import { CalendarManagerService } from 'src/app/calendar/calendar-manager.service';
import { TimesheetService } from 'src/app/shared/timesheet.service';
import { CalendarComponent } from 'src/app/calendar/calendar.component';
import { CopyToClipboardDirective } from 'src/app/shared/copy-to-clipboard.directive';
import { MailtoDirective } from 'src/app/shared/mailto.directive';
import { InvoiceFormComponent } from '../../invoice/invoice-form/invoice-form.component';
import { Timesheet } from 'src/app/shared/timesheet.model';
import { Invoice } from 'src/app/shared/invoice.model';

let testTimesheet = new Timesheet('test');
    testTimesheet.workingDays['0.1900'] = [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    testTimesheet.invoice = new Invoice('F190001-01');
const testEditTokenWithoutInvoice = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: new Timesheet('test') }))));
const testEditTokenWithInvoice = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: testTimesheet }))));
const testReviewToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet: testTimesheet }))));

class MockCalendarManagerService {
  getworkingDays(): any {
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
        MockComponent(CalendarComponent),
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
    let spySetTitle: jasmine.Spy;
    let spyValueChangesSubscribe: jasmine.Spy;

    beforeEach(() => {
      spySetTitle = spyOn(titleService, 'setTitle');
      spyValueChangesSubscribe = spyOn(component.form.valueChanges, 'subscribe');
    });

    describe('When there is no `data` parameter', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should create a new Timsheet instance', () => {
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

        testValueChanges();
      });

      describe('and the `mode` stored in the token is not "edit"', () => {
        let spyRouterNavigate;

        beforeEach(() => {
          route.snapshot.params = { data: testReviewToken };
          spyRouterNavigate = spyOn(router, 'navigate');
          fixture.detectChanges();
        });

        it('sould navigate to the "create" URL', () => {
          expect(spyRouterNavigate).toHaveBeenCalledWith(['timesheet', 'create']);
        });
      });
    });

    it('should set "Acrabadabra - Saisir un compte rendu d\'activité" as page title if `mode` is not "edit"', () => {
      fixture.detectChanges();
      expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Saisir un compte rendu d\'activité');
    });

    it('should set "Acrabadabra - Modifier un compte rendu d\'activité" as page title if `mode` is "edit"', () => {

      route.snapshot.params = { data: testEditTokenWithInvoice };
      fixture.detectChanges();
      expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Modifier un compte rendu d\'activité');
    });

    function testValueChanges() {
      it('should subscribe to the `valueChanges` observable', () => {
        expect(spyValueChangesSubscribe).toHaveBeenCalled();
      });

      // TODO Make it work...

      // describe('after subscribing if the user input data into the `form`', () => {
      //   beforeEach(async() => {
      //     fixture.detectChanges();
      //     await fixture.whenStable();
      //     component.showLinks = true;
      //     component.submitMessage = { content: 'test' };
      //     const fc = this.form.form.get('consultantEmailInput');
      //     console.log('show links :', this.showLinks);
      //     console.log(this.form.dirty);
      //     this.form.form.markAsDirty();
      //     fc.setValue('un autre test');
      //     console.log(this.form.dirty);
      //     console.log('show links :', this.showLinks);
          // const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name=consultantEmailInput]')).nativeElement;
          //       emailInput.value = 'test';
          //       emailInput.dispatchEvent(new Event('input'));
          //       fixture.detectChanges();
        // });
        // testOnUserInput();
      // });
    }
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
    beforeEach(async(() => {
      fixture.whenStable().then(() => {
        component.showLinks = true;
        component.submitMessage = { content: 'test' };
        component.onUserInput();
      });
    }));
    testOnUserInput();
  });

  describe('reactToSubmition()', () => {
    beforeEach(() => {
      component.submitMessage = null;
      component.showLinks = null;
    });

    describe('when there is an `error`', () => {
      beforeEach(() => {
        component.reactToSubmition(true);
      });
      it('sould let `showLinks` false', () => {
        expect(component.showLinks).toBeFalsy();
      });
      it('should set the `submitMessage.text` to "Veuillez vérifier votre saisie"', () => {
        expect(component.submitMessage.text).toBe('Veuillez vérifier votre saisie');
      });
      it('should set the `submitMessage.type` to "error"', () => {
        expect(component.submitMessage.type).toBe('error');
      });
    });

    describe('when there is no `error`', () => {
      beforeEach(() => {
        component.reactToSubmition(false);
      });
      it('should set `showLinks` to true', () => {
        expect(component.showLinks).toBeTruthy();
      });
      it('should set the `submitMessage.text` to "Si vous modifiez le CRA, vous devrez le valider à nouveau et utiliser le nouveau lien de partage."', () => {
        expect(component.submitMessage.text).toBe('Si vous modifiez le CRA, vous devrez le valider à nouveau et utiliser le nouveau lien de partage.');
      });
      it('should set the `submitMessage.type` to "success"', () => {
        expect(component.submitMessage.type).toBe('success');
      });
    });
  });

  function testOnUserInput() {
    it('should set `showLinks` to false', () => {
      expect(component.showLinks).toBeFalsy();
    });

    it('should set `submitMessage` to null', () => {
      expect(component.submitMessage).toBeNull();
    });
  }
});
