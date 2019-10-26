import { Component, Input } from '@angular/core';

import { Alert } from '../../@type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {

  @Input() alert: Alert;

}
