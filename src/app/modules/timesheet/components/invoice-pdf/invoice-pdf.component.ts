import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as jsPDF from 'jspdf';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';

import { TimesheetService } from '../../timesheet.service';

import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { Invoice } from 'src/app/shared/models/invoice.model';
import { Company } from 'src/app/shared/models/company.model';
import { Timesheet } from 'src/app/shared/models/timesheet.model';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss']
})

export class InvoicePDFComponent implements OnInit {

  timesheet: Timesheet;
  local = 'fr';
  totalHT: number;
  totalTTC: number;
  vatRate: number;
  currencyCode: string;
  workedTime: number;

  constructor(
    public calendarService: CalendarService,
    private monetaryService: MonetaryService,
    private route: ActivatedRoute,
    private timesheetService: TimesheetService,
  ) {
    this.timesheetService.openTimesheet(this.route.snapshot.paramMap.get('data'), 'review');
    this.timesheet = this.timesheetService.timesheet;
    this.timesheet.invoice = Object.assign(new Invoice(), this.timesheet.invoice);
    this.timesheet.invoice.provider = Object.assign(new Company(), this.timesheet.invoice.provider);
    this.timesheet.invoice.client = Object.assign(new Company(), this.timesheet.invoice.client);
    this.workedTime = this.calendarService.getWorkedTime(this.timesheet);
    this.vatRate = this.monetaryService.vatRate;
    this.totalHT = this.workedTime * this.timesheet.invoice.dailyRate;
    this.totalTTC = this.totalHT + (this.vatRate * this.totalHT / 100);
    this.currencyCode = this.monetaryService.currencyCode;
  }

  ngOnInit() {
    // const pdf = new jsPDF('p', 'pt', 'A4');
    //       pdf.html(document.querySelector('.invoice'), {callback: pdf => {
    //         pdf.deletePage(2);
    //         pdf.save(`${this.timesheet.invoice.number}.pdf`);
    //       }});
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString(this.local, { day: '2-digit', month: '2-digit', year: 'numeric'});
  }

  formatDuration(): string {
    console.log(this.calendarService.getLastWorkingDay(this.timesheet));

    const start = this.formatDate(this.calendarService.getFirstWorkingDay(this.timesheet).toString());
    const end = this.formatDate(this.calendarService.getLastWorkingDay(this.timesheet).toString());

    if (start !== end) {
      return  'du ' +
            start +
            ' au ' +
            end;
    } else {
      return `le ${start}`;
    }
  }
}
