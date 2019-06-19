import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { Timesheet } from 'src/app/shared/models/timesheet.model';

export class ReviewMail {
  subject: string;
  body: string;
  locale = 'fr';

  constructor(timesheet: Timesheet, calendar: CalendarService, workedTime: number, url: string) {
    this.setSubject(timesheet.consultant.name, calendar.getDate(timesheet));
    this.setBody(timesheet, workedTime, url);
  }

  setSubject(consultantName: string, date: Date) {
    this.subject =
      'Acrabadabra  - Compte rendu d\'activité de ' +
      consultantName +
      ', ' +
      date.toLocaleString(this.locale, { month: 'long', year: 'numeric' });
  }

  setBody(timesheet: Timesheet, workedTime: number, url: string) {
    this.body =
      'Bonjour,%0d%0a' +
      '%0d%0a' +
      'Un compte rendu d\'activité est consultable sur https://www.acrabadabra.com' +
      '%0d%0a' +
      '%0d%0a' +
      `Consultant : ${timesheet.consultant.name}%0d%0a` +
      `Mission : ${timesheet.mission.title}%0d%0a` +
      `Journées de prestation : ${workedTime.toLocaleString('fr')}%0d%0a` +
      '%0d%0a' +
      'Vous pouvez le consulter et télécharger la facture ici :%0d%0a ' +
      `${url}`;
  }
}
