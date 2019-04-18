import { Directive, Input, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';

@Directive({
  selector: '[copyToClipboard]',
})
export class CopyToClipboardDirective {
  @Input('copyToClipboard')
  public payload: string;

  @Input('copyToClipboardMessage')
  public message: string;

  @Input('copyToClipboardMessageParent')
  public parent: HTMLElement;

  @Output()
  public copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  public onCopy(event: MouseEvent): void {
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

  constructor(private notificationService: NotificationService) {}
}
