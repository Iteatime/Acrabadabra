import { Directive, Input, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[copyToClipboard]',
})
export class CopyToClipboardDirective {

  @Input('copyToClipboard')
  payload: string;

  @Input('copyToClipboardMessage')
  message: string;

  // tslint:disable-next-line:no-input-rename
  @Input('copyToClipboardMessageParent')
  parent: HTMLElement;

  @Output()
  copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  onCopy (event: MouseEvent): void {

    event.preventDefault();
    if (!this.payload) {
      return;
    }

    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', this.payload.toString());
      e.preventDefault();

      this.copied.emit(this.payload);
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);

    if (!this.message) {
      this.message = 'Copied';
    }

    this.notificationService.push(this.message, 'info');
  }

  constructor (private readonly notificationService: NotificationService) { }

}
