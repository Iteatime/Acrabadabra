import { Directive, Input, HostListener } from '@angular/core';
import { ReviewMail } from '../../models/review-mail.model';

@Directive({
  selector: '[mailto]'
})
export class MailtoDirective {

  @Input('mailto')
  recipient: string;

  @Input()
  mailContent: ReviewMail;

  @HostListener('click', ['$event'])
  onClick (event: MouseEvent): void {
    event.preventDefault();

    if (this.recipient === undefined) {
      this.recipient = '';
    }

    window.open(
      'mailto:' + this.recipient +
      '?subject=' + this.mailContent.subject +
      '&body=' + this.mailContent.body,
      '_self'
    );
  }

}
