import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, Params, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';

import { of, Subject, BehaviorSubject } from 'rxjs';

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
const editToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: testTimesheet }))));
const reviewToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet: testTimesheet }))));

class MockTimesheetService {
  timesheet: Timesheet;

  openTimesheet(token: string): boolean {
    this.timesheet = testTimesheet;
    return token === editToken;
  }

  getEditToken(): string {
    return editToken;
  }

  getReviewToken(): string {
    return reviewToken;
  }
}

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
        RouterTestingModule,
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
        { provide: TimesheetService, useClass: MockTimesheetService },
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(TimesheetEditComponent);
    component = fixture.componentInstance;
    titleService = TestBed.get(Title);
    timesheetService = TestBed.get(TimesheetService);
    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    let spySetTitle;

    beforeEach(() => {
      spySetTitle = spyOn(titleService, 'setTitle');
    });

    describe('when responding to the create URL', () => {
      beforeEach(() => {
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should set "editMode" to false', () => {
        expect(component.editMode).toBe(false);
      });

      it('should create a new "Timsheet" instance', () => {
        expect(timesheetService.timesheet.consultant.email).toBe('');
      });

      it('should set Acrabadabra - Saisir un compte rendu d\'activité as page title', () => {
        expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Saisir un compte rendu d\'activité');
      });
    });

    describe('when responding to the edit URL', () => {
      describe('if the "mode" stored in the token is not "edit"', () => {

        let spyRouterNavigate;

        beforeEach(() => {
          route.snapshot.params = { data: reviewToken };
          spyRouterNavigate = spyOn(router, 'navigate');
          component.ngOnInit();
          fixture.detectChanges();
        });

        it('should set "editMode" to false', () => {
          expect(component.editMode).toBe(false);
        });

        it('sould navigate to the "create" URL', () => {
          expect(spyRouterNavigate).toHaveBeenCalledWith(['timesheet', 'create']);
        });
      });

      describe('if the "mode" stored in the token is edit', () => {
        beforeEach(() => {
          route.snapshot.params = { data: editToken };
          component.ngOnInit();
          fixture.detectChanges();
        });

        it('should set "editMode" to true', () => {
          expect(component.editMode).toBe(true);
        });

        it('it should set "Acrabadabra - Modifier un compte rendu d\'activité as page title" as page title', () => {
          expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Modifier un compte rendu d\'activité');
        });
      });
    });
  });
});
