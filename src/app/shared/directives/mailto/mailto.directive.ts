import { Directive, HostListener, Input } from '@angular/core';
import { ReviewMail } from '../../models/review-mail.model';

@Directive({
  selector: '[appMailto]',
})
export class MailtoDirective {
  @Input('appMailto')
  recipient?: string;

  @Input()
  mailContent: ReviewMail;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.preventDefault();

    if (this.recipient === undefined) {
      this.recipient = '';
    }

    window.open(
      'mailto:' + this.recipient + '?subject=' + this.mailContent.subject + '&body=' + this.mailContent.body,
      '_self',
    );
  }
}
