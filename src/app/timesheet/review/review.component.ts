import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cra } from '../../shared/cra.model';
import { formData } from 'src/app/@types/formData';
import { Params, ActivatedRoute } from '@angular/router';
import { SerializerService } from 'src/app/shared/serialization/serializer.service';
import { CalendarManagerService } from 'src/app/shared/calendar/calendar-manager.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewComponent implements OnInit {
  timesheet = new Cra();
  generateInvoice = false;
  invoiceToken: string;

  constructor(
    private calendarManager: CalendarManagerService,
    private route: ActivatedRoute,
    private serializer: SerializerService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        const data: formData = this.serializer.deserialize(params['data']);
        this.timesheet = data.cra;
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
      }
    );
  }

}
