import { Timesheet } from '../@types/timesheet';
import { CalendarService } from 'src/app/modules/calendar/calendar.service';

export class ReviewMail {
  subject: string;
  body: string;
  locale = 'fr';

  constructor(timesheet: Timesheet, calendar: CalendarService, workedTime: any[], url: string) {
    this.setSubject(timesheet.consultant.name, calendar.getDate(timesheet));
    this.setBody(timesheet, calendar, workedTime, url);
  }

  setSubject(consultantName: string, date) {
    this.subject =
      "Acrabadabra  - Compte rendu d'activité de " +
      consultantName +
      ', ' +
      date.toLocaleString(this.locale, { month: 'long', year: 'numeric' });
  }

  setBody(timesheet: Timesheet, calendar: CalendarService, workedTime: any[], url: string) {
    let workedTimeString = '';

    workedTime.forEach(entry => {
      workedTimeString += `Nombre d'unités d'oeuvre (${calendar.timeUnits[entry.unit].label}) : ${entry.time}%0d%0a`;
    });

    this.body =
      'Bonjour,%0d%0a' +
      '%0d%0a' +
      "Un compte rendu d'activité est consultable sur https://www.acrabadabra.com" +
      '%0d%0a' +
      '%0d%0a' +
      `Consultant : ${timesheet.consultant.name}%0d%0a` +
      `Mission : ${timesheet.mission.title}%0d%0a` +
      workedTimeString +
      '%0d%0a' +
      'Vous pouvez le consulter et télécharger la facture ici :%0d%0a ' +
      `${url}`;
  }
}
