import { Component, OnInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Company } from '../shared/company.model';
import { MonetaryService } from '../shared/monetary.service';
import { CalendarManagerService } from '../calendar/calendar-manager.service';
import { TimesheetService } from '../shared/timesheet.service';
import { Invoice } from '../shared/invoice.model';

@Component({
  selector: 'app-pdf-invoice',
  templateUrl: './pdf-invoice.component.html',
  styleUrls: ['./pdf-invoice.component.scss']
})

export class PdfInvoiceComponent implements OnInit {

  data;
  local = 'fr';
  provider: Company;
  client: Company;
  invoice: Invoice;
  workedTime: number;
  totalHT: number;
  totalTTC: number;
  vat: number;
  period: Date;
  currency: string;

  constructor(
    private calendarManager: CalendarManagerService,
    private currencyService: MonetaryService,
    private route: ActivatedRoute,
    private timesheetService: TimesheetService,
  ) {
    this.data = this.timesheetService.deTokenize(this.route.snapshot.paramMap.get('data'));
    this.provider = Object.assign(new Company(), this.data.invoice.provider);
    this.client = Object.assign(new Company(), this.data.invoice.client);
    this.invoice = Object.assign(new Invoice(), this.data.invoice);
    this.workedTime = this.calendarManager.getWorkedTime(this.data.timesheet);
    this.period = this.calendarManager.getDate(this.data.timesheet);
    this.vat = this.currencyService.getVat();
    this.totalHT = this.workedTime * this.data.invoice.dailyRate;
    this.totalTTC = this.totalHT + (this.vat * this.totalHT / 100);
    this.currency = this.currencyService.getCurrency();
  }

  ngOnInit() {
    html2canvas(document.getElementById('invoice')).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPG', 0, 0);
            pdf.save(this.data.invoice.number + '.pdf');
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString(this.local, { day: '2-digit', month: '2-digit', year: 'numeric'});
  }

  formatDuration(month: Date): string {
    return 'du ' +
          startOfMonth(month).toLocaleString(this.local, { day: '2-digit', month: '2-digit', year: 'numeric'}) +
          ' au ' +
          endOfMonth(month).toLocaleString(this.local, { day: '2-digit', month: '2-digit', year: 'numeric'});
  }

}
