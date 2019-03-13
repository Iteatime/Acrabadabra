import { Component, ViewEncapsulation} from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  public title = 'Acrabadabra';

  public constructor(public auth: AuthenticationService) {}

  public onClick() {
    this.auth.widget.open();
  }
}
