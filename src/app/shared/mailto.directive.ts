import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[mailto]'
})
export class MailtoDirective {

  @Input('mailto')
  public recipient: string;

  // tslint:disable-next-line:no-input-rename
  @Input('mailtoSubject')
  public subject: string;

  // tslint:disable-next-line:no-input-rename
  @Input('mailtoBody')
  public body: string;

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {

    event.preventDefault();

    if (!this.subject) {
      return;
    }

    if (this.recipient === undefined) {
      this.recipient = '';
    }

    window.open(
      'mailto:' + this.recipient +
      '?subject=' + this.subject +
      '&body=' + this.body,
      '_self'
    );
  }

}
