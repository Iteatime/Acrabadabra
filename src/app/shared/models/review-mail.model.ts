// import { Timesheet } from '../@types/timesheet';
import { Mission, Timesheet } from '.';
import { CalendarService } from 'src/app/modules/calendar/calendar.service';

export class ReviewMail {
  public subject: string;
  public body: string;
  public locale = 'fr';

  constructor(timesheet: Timesheet, mission: Mission, calendar: CalendarService, workedTime: any[], url: string) {
    this.setSubject(mission.consultant.name, calendar.getDate(timesheet));
    this.setBody(timesheet, mission, calendar, workedTime, url);
  }

  setSubject(consultantName: string, date) {
    this.subject = 'Acrabadabra  - Compte rendu d\'activité de ' +
    consultantName +
    ', ' +
    date.toLocaleString(this.locale, { month: 'long', year: 'numeric' });
  }

  setBody(timesheet: Timesheet, mission: Mission, calendar: CalendarService, workedTime: any[], url: string) {
    let workedTimeString = '';

    workedTime.forEach(entry => {
      workedTimeString += `Nombre d'unités d'oeuvre (${calendar.timeUnits[entry.unit].label}) : ${entry.time}%0d%0a`;
    });

    this.body = 'Bonjour,%0d%0a' +
    '%0d%0a' +
    'Un compte rendu d\'activité est consultable sur https://www.acrabadabra.com' +
    '%0d%0a' +
    '%0d%0a' +
    `Consultant : ${mission.consultant.name}%0d%0a` +
    `Mission : ${mission.title}%0d%0a` +
    workedTimeString +
    '%0d%0a' +
    'Vous pouvez le consulter et télécharger la facture ici :%0d%0a ' +
    `${url}`;
  }
}

