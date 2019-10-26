import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-from-now',
  template: '{{ dateFromNow }}',
})
export class FromNowComponent implements OnInit {
  @Input() private date: any;

  public dateFromNow: string;

  ngOnInit() {
    if (this.date && moment(this.date).isValid()) {
      this.dateFromNow = moment(this.date).fromNow();
    }
  }
}
