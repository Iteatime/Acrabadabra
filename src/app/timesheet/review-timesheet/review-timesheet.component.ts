import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Timesheet } from '../../shared/timesheet.model';
import { TimesheetTokenData } from 'src/app/@types/timesheetTokenData';
import { Params, ActivatedRoute } from '@angular/router';
import { SerializerService } from 'src/app/shared/serialization/serializer.service';
import { CalendarManagerService } from 'src/app/shared/calendar/calendar-manager.service';

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

  constructor(
    private calendarManager: CalendarManagerService,
    private route: ActivatedRoute,
    private serializer: SerializerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const data: TimesheetTokenData = this.serializer.deserialize(params['token']);
      this.timesheet = data.timesheet;
      if (data.invoice !== null) {
        this.generateInvoice = true;
        const invoice = {
          consultant: this.timesheet.consultant,
          mission: this.timesheet.mission,
          time: this.calendarManager.getWorkedTime(this.timesheet),
          invoice: data.invoice,
        };

        this.invoiceToken = this.serializer.serialize(invoice);
      }
    });
  }

}
