import * as moment from '@sebastien-cleany/moment-ferie-fr';

export class Period {
  public duration: number;
  private _month: moment.Moment;
  private _start: moment.Moment;
  private _end: moment.Moment;

  public constructor(month?: any) {
    if (!month) {
      month = new Date();
    }
    this.month = moment(month);
  }

  public get month(): moment.Moment  {
    return this._month;
  }

  public set month(value: moment.Moment) {
    this._month = moment(value).startOf('month');
    this.setStart(moment(this.month).day('Monday'));
    this.setEnd(moment(this.month).endOf('month').day('Sunday'));
    this.duration = this._end.diff(this._start, 'days');
  }

  public get end(): moment.Moment {
    return this._end;
  }

  public get start(): moment.Moment {
    return this._start;
  }

  private setStart(value: moment.Moment) {
    if (value.month() === this.month.month() && value.date() !== 1) {
      value.subtract(1, 'week');
    }
    this._start = moment(value);
  }

  private setEnd(value: moment.Moment) {
    if (value.month() === this.month.month() && value.date() < this.month.daysInMonth()) {
      value.add(1, 'week');
    }
    this._end = moment(value);
  }
}
