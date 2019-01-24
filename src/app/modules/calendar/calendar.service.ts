import { Injectable } from '@angular/core';

import * as moment from '@sebastien-cleany/moment-ferie-fr';

import { Period } from 'src/app/shared/models/period.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public period: Period;
  public workingDays: any;

  constructor() {
    this.period = new Period();
    this.workingDays = this.getWorkingDays();
  }

  public openWorkingDays(workingDays: any) {
    workingDays.forEach(week => {
      week.forEach(day => {
        day.date = moment(day.date);
      });
    });
    this.workingDays = workingDays;
  }

  public getWorkingDays() {
    const array = [];
    let week = [];
    for (let index = 0; index <= this.period.duration;  index++) {
      week.push({ date: moment(this.period.start).add(index, 'days'), time: 0 });
      if (index % 7 === 6) {
        array.push(week);
        week = [];
      }
    }
    return array;
  }

  public setPeriod(value: any) {
    this.period.month = value;
    this.workingDays = this.getWorkingDays();
  }

  isBusinessDay(day: moment.Moment) {
    return  day.day() !== 0 &&
            day.day() !== 6 &&
            day.isSame(this.period.month, 'month') &&
            !day.isFerie();
  }

  getWorkedTime() {
    let workedTime = 0;
    this.workingDays.forEach(week => {
      week.forEach(day => {
        workedTime += day.time;
      });
    });
    return workedTime;
  }
}
