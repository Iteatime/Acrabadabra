import { Directive, Input, Output, EventEmitter, HostListener, OnChanges} from '@angular/core';

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
  public onClick(event: MouseEvent): void {

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

    const message: HTMLElement = this.parent.appendChild(document.createElement('div'));
          message.className = 'alert alert-success';
          message.innerText = this.message;

    setTimeout(() => {
      (<HTMLElement>event.target).parentNode.parentNode.removeChild(message);
    }, 5000);
  }

}
