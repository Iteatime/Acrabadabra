import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';

/* tslint:disable:no-input-rename */
@Directive({
  selector: '[appCopyToClipboard]',
})
export class CopyToClipboardDirective {
  @Input('appCopyToClipboard')
  payload: string;

  @Input('appCopyToClipboardMessage')
  message: string;

  @Input('appCopyToClipboardMessageParent')
  parent: HTMLElement;

  @Output()
  copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  onCopy(event: MouseEvent): void {
    event.preventDefault();
    if (!this.payload) {
      return;
    }

    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData || (window as any)['clipboardData'];
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

  constructor(private notificationService: NotificationService) {}
}
