import { Directive, OnInit, ElementRef, Input, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '.modal',
})
export class ModalDirective implements OnInit {
  @HostBinding('class.open') get open() { return this.toggled; }
  @Input() toggled: boolean;
  @Output() close = new EventEmitter<any>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.toggled = false;
  }

  @HostListener('click', ['$event']) onModalClose(event: Event) {

    const target = <HTMLElement>event.target;

    if (target.hasAttribute('aria-label') && target.attributes['aria-label'].nodeValue === 'Close') {
      this.toggled = false;
      this.close.emit({ closer: target });
    }
  }

}
