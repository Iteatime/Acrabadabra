import { Component, Input } from '@angular/core';

@Component({
  selector: "app-activity-card",
  templateUrl: "./activity-card.component.html"
})
export class ActivityCardComponent {
  @Input() icon: string;
  @Input() color: string;
  @Input() content: string;
  @Input() title: string;

  constructor() { }
}
