import { Timesheet } from '../@types/timesheet';

export class ReviewMail {
  public subject: string;
  public body: string;

  constructor(timesheet: Timesheet, workedTime: number, reviewToken: string, url: string) {
    this.setSubject(timesheet.consultant.name);
    this.setBody(timesheet, workedTime, reviewToken, url);
  }

  setSubject(consultantName: string) {
    this.subject = 'Acrabadabra  - Compte rendu d\'activité de ' + consultantName;
  }

  setBody(timesheet: Timesheet, workedTime: number, reviewToken: string, url: string) {
    this.body = 'Bonjour,%0d%0a' +
    '%0d%0a' +
    'Un compte rendu d\'activité est consultable sur https://Acrabadabra.com .%0d%0a' +
    '%0d%0a' +
    `Consultant : ${timesheet.consultant.name}%0d%0a` +
    `Mission : ${timesheet.mission.title}%0d%0a` +
    `Journées de prestation : ${workedTime.toLocaleString('fr')}%0d%0a` +
    '%0d%0a' +
    'Vous pouvez le consulter et télécharger la facture ici :%0d%0a ' +
    `${url}${reviewToken}`;
  }
}
