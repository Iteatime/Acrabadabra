import { ComponentFixture, TestBed } from '@angular/core/testing';

import * as _ from 'lodash';

import * as moment from '@sebastien-cleany/moment-ferie-fr';
import 'moment/locale/fr';

import { CalendarSelectorComponent } from './calendar-selector.component';
import { CalendarService } from '../../calendar.service';

moment.locale('fr');

describe('CalendarComponent', () => {
  let component: CalendarSelectorComponent;
  let fixture: ComponentFixture<CalendarSelectorComponent>;
  let compiled: any;
  let calendarService: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarSelectorComponent,
      ],
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarSelectorComponent);
    component = fixture.componentInstance;
    calendarService = TestBed.get(CalendarService);
    compiled = fixture.debugElement.nativeElement;

    calendarService.setPeriod(moment('1900-01-01'));
    component.enable = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when a day cell clicked', () => {
      beforeEach(() => {
        component.toggleDay(new Event('click'), 0, 0);
        fixture.detectChanges();
      });

      describe('and it wasn\'t selected', () => {
        testTotalWorkedTime(1);
        testWorkedTime(1);
        testLabel(true);
      });

      describe('and it was selected', () => {
        beforeEach(() => {
          component.toggleDay(new Event('click'), 0, 0);
          fixture.detectChanges();
        });

        testTotalWorkedTime(0);
        testWorkedTime(0);
        testLabel(false);
      });

      describe('and it not in the same month', () => {
        beforeEach(() => {
          component.toggleDay(new Event('click'), 0, 0);
          component.toggleDay(new Event('click'), 4, 3);
          fixture.detectChanges();
        });

        testTotalWorkedTime(0);
        testWorkedTime(0, 3, 4);
        testLabel(false, 3, 4);
      });
  });

  describe('when editing a selected day', () => {
    const event = new Event('click');

    beforeEach(() => {
      component.toggleDay(event, 0, 0);
      fixture.detectChanges();
    });

    describe('and the new value is 0', () => {
      beforeEach(() => {
        component.editDayTime(event, 0, 0, 0);
        fixture.detectChanges();
      });

      testTotalWorkedTime(0);
      testWorkedTime(0);
      testLabel(false);
    });

    describe('and the new value is 1', () => {
      beforeEach(() => {
        component.editDayTime(event, 0, 0, 1);
        fixture.detectChanges();
      });

      testTotalWorkedTime(1);
      testWorkedTime(1);
      testLabel(true);
    });

    describe('and the new value is 0,5', () => {
      beforeEach(() => {
        component.editDayTime(event, 0, 0, 0.5);
        fixture.detectChanges();
      });

      testTotalWorkedTime(0.5);
      testWorkedTime(0.5);
      testLabel(true);
    });
  });

  describe('when selecting all business days', () => {
    beforeEach(() => {
      component.selectAllBusinessDays();
      fixture.detectChanges();
    });

    it('should select every business days', () => {
      expect(calendarService.getWorkedTime()).toBe(22);
    });
  });

  describe('when selecting all business days', () => {
    beforeEach(() => {
      component.toggleDay(new Event('click'), 0, 0);
      component.toggleDay(new Event('click'), 0, 1);
      component.toggleDay(new Event('click'), 0, 2);
      component.emptySelection();
      fixture.detectChanges();
    });

    it('should unselect every days', () => {
      expect(calendarService.getWorkedTime()).toBe(0);
    });
  });

  describe('when you change the month', () => {
    let previousDate;

    beforeEach(() => {
      previousDate = moment(calendarService.period.month);
    });

    describe('to the next', () => {
      beforeEach(() => {
        component.nextMonth();
        fixture.detectChanges();
      });

      it('sould show the new month', () => {
        expect(compiled.querySelector('.calendar__header__month-choice__detail').textContent).toContain('février 1900');
      });

      it('should change the period', () => {
        expect(calendarService.period.month).toEqual(previousDate.add(1, 'month'));
      });

      testTotalWorkedTime(0);
    });

    describe('to the previous', () => {
      beforeEach(() => {
        component.previousMonth();
        fixture.detectChanges();
      });

      it('sould show the new month', () => {
        expect(compiled.querySelector('.calendar__header__month-choice__detail').textContent).toContain('décembre 1899');
      });

      it('should change the period', () => {
        expect(calendarService.period.month).toEqual(previousDate.subtract(1, 'month'));
      });

      testTotalWorkedTime(0);
    });
  });

  function testTotalWorkedTime(value: number) {
    it('should set the worked time to ' + value, () => {
      expect(calendarService.getWorkedTime()).toBe(value);
    });
  }

  function testWorkedTime(value: number, day: number = 0, week: number = 0) {
    it('should set this day\'s worked time to ' + value, () => {
      expect(calendarService.workingDays[week][day].time).toBe(value);
    });
  }

  function testLabel(present, day: number = 0, week: number = 0) {
    it(`should${!present ? 'n\'t' : ''} show its label`, () => {
      let test = expect(
        compiled
        .querySelectorAll('div.calendar__content__dayselect__row')[week]
        .children[day]
        .textContent
      );
      if (!present) {
        test = test.not;
      }
      test.toContain('jour');
    });
  }
});

