import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Params, ActivatedRoute } from '@angular/router';

import { CalendarManagerService } from 'src/app/calendar/calendar-manager.service';

import { Timesheet } from '../shared/timesheet.model';
import { TimesheetService } from '../shared/timesheet.service';

@Component({
  selector: 'app-review',
  templateUrl: './review-timesheet.component.html',
  styleUrls: ['./review-timesheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewTimesheetComponent implements OnInit {
  timesheet = new Timesheet();
  generateInvoice = false;
  invoiceToken: string;
  date: Date;
  locale = 'fr';
  workingTime: number;

  constructor(
    private calendarManager: CalendarManagerService,
    private route: ActivatedRoute,
    private timesheetService: TimesheetService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (this.timesheetService.openTimesheet(params['data'], 'review')) {
        this.timesheet = this.timesheetService.timesheet;
        this.date = this.calendarManager.getDate(this.timesheet);
        this.workingTime = this.calendarManager.getWorkedTime(this.timesheet);

        if (this.timesheet.invoice !== undefined) {
           this.invoiceToken = params['data'];
           this.generateInvoice = true;
        }
      }
    });

    this.titleService.setTitle('Acradababra - Consulter un compte rendu d\'activité');

  }

}
