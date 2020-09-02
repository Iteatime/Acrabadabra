import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Params, ActivatedRoute } from '@angular/router';

import { Timesheet } from 'src/app/shared/models/timesheet.model';
import { Commute } from '../../../../shared/models/commute';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { TimesheetService } from '../../services/timesheet.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { WorkingEvent } from 'src/app/shared/@types/workingEvent';

@Component({
  selector: 'app-review',
  templateUrl: './timesheet-review.component.html',
  styleUrls: ['./timesheet-review.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class TimesheetReviewComponent implements OnInit {
  timesheet = new Timesheet();
  generateInvoice = false;
  invoiceLink: string;
  date: Date;
  locale = 'fr';
  workedTime: WorkingEvent[];
  commutes: Commute[];
  showAllowanceTable = false;
  showMiscellaneousTable = false;
  transferToken: string;

  constructor(
    public auth: AuthenticationService,
    public calendarService: CalendarService,
    private readonly route: ActivatedRoute,
    private readonly timesheetService: TimesheetService,
    private readonly titleService: Title,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (this.timesheetService.openTimesheet(params['data'], 'review')) {
        this.timesheet = this.timesheetService.timesheet;
        this.date = this.calendarService.getDate(this.timesheet);
        this.workedTime = this.calendarService.getWorkedTime(this.timesheet);
        this.transferToken = this.timesheetService.getTransferToken();
        this.generateInvoice = false;

        if (this.timesheet.invoice) {
          this.invoiceLink = this.timesheetService.getInvoiceLink();
          this.generateInvoice = true;
        }
      }
    });
    this.titleService.setTitle("Acradababra - Consulter un compte rendu d'activité");
  }
}
