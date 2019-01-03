import { Component, OnInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf-invoice',
  templateUrl: './pdf-invoice.component.html',
  styleUrls: ['./pdf-invoice.component.scss']
})

export class PdfInvoiceComponent implements OnInit {

  data;
  local = 'fr';
  total = () => this.data.time * this.data.invoice.dailyRate;
  vat = () => 20 * this.total() / 100;

  constructor(private route: ActivatedRoute) {
    this.data = JSON.parse(atob(this.route.snapshot.paramMap.get('data')));
  }

  ngOnInit() {

    html2canvas(document.getElementById('invoice')).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPG', 0, 0);
            pdf.save('Acrabadabra.com - ' + this.data.consultant.name + '- Facture n°' + this.data.invoice.number + '.pdf');
    });
  }

  formatDate(date: string): string {
    // 21/12/2012
    return new Date(date).toLocaleString(this.local, { day: '2-digit', month: '2-digit', year: 'numeric'});
  }

  formatCurency(sum: number): string {
    // 100€
    return +sum + '€';
  }

}
