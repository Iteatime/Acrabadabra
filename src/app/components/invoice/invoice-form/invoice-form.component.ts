import { Component, ViewChild, Input, Output, OnInit, EventEmitter, AfterViewInit } from '@angular/core';
import { Invoice } from 'src/app/shared/invoice.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input() invoice: Invoice = new Invoice();
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }
}
