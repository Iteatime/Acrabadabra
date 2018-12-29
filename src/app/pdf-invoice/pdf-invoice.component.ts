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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = JSON.parse(atob(this.route.snapshot.paramMap.get('data')));

    html2canvas(document.getElementById('invoice')).then(canvas => {    
      let pdf = new jsPDF('p', 'mm', 'a4'); 
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0)  
      pdf.save(this.data.invoice.number + '.pdf');
    });  
  }
}