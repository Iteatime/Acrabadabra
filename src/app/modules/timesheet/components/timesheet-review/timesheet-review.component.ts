import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Params, ActivatedRoute } from "@angular/router";

import { Timesheet } from "src/app/shared/models/timesheet.model";
import { Commute } from "../../../../shared/models/commute";

import { CalendarService } from "src/app/modules/calendar/calendar.service";
import { TimesheetService } from "../../services/timesheet.service";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { WorkingEvent } from "src/app/shared/@types/workingEvent";

@Component({
  selector: "app-review",
  templateUrl: "./timesheet-review.component.html",
  styleUrls: ["./timesheet-review.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TimesheetReviewComponent implements OnInit {
  timesheet = new Timesheet();
  generateInvoice = false;
  invoiceLink: string;
  date: Date;
  locale = "fr";
  workedTime: WorkingEvent[];
  commutes: Commute[];
  showAllowanceTable = false;
  showMiscellaneousTable = false;
  transferToken: string;
  ready: boolean;

  constructor(
    public auth: AuthenticationService,
    public calendarService: CalendarService,
    private route: ActivatedRoute,
    private timesheetService: TimesheetService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      if (await this.timesheetService.openTimesheet(params.data, "review")) {
        this.timesheet = this.timesheetService.timesheet;
        this.date = this.calendarService.getDate(this.timesheet);
        this.workedTime = this.calendarService.getWorkedTime(this.timesheet);
        this.transferToken = this.timesheetService.getTransferToken();
        this.generateInvoice = false;

        if (this.timesheet.invoice) {
          this.invoiceLink = this.timesheetService.getInvoiceLink();
          this.generateInvoice = true;
        }

        this.ready = true;
      }
    });

    // if (this.route.snapshot.params.data) {
    //   const timesheet = await this.timesheetService.getTimesheet(
    //     this.route.snapshot.params.data
    //   );

    //   this.timesheetService.timesheet = timesheet;
    //   this.timesheet = this.timesheetService.timesheet;
    //   this.date = this.calendarService.getDate(this.timesheet);
    //   this.workedTime = this.calendarService.getWorkedTime(this.timesheet);
    //   this.transferToken = this.timesheetService.getTransferToken();
    //   this.generateInvoice = false;

    //   if (this.timesheet.invoice) {
    //     this.invoiceLink = this.timesheetService.getInvoiceLink();
    //     this.generateInvoice = true;
    //   }
    //   this.ready = true;
    //   console.log(this.timesheetService.timesheet);
    // }

    this.titleService.setTitle(
      "Acradababra - Consulter un compte rendu d'activité"
    );
  }
}
