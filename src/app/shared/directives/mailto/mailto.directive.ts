import { Directive, Input, HostListener } from '@angular/core';
import { ReviewMail } from '../../models/review-mail.model';

@Directive({
  selector: '[mailto]'
})
export class MailtoDirective {

  @Input('mailto')
  public recipient: string;

  @Input()
  public mailContent: ReviewMail;

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();

    if (this.recipient === undefined) {
      this.recipient = '';
    }

    window.open(
      'mailto:' + this.recipient +
      '?subject=' + this.mailContent.subject +
      '&body=' + this.mailContent.boby,
      '_self'
    );
  }

}
