import { Component, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  public title = 'Acrabadabra';

  public constructor(
    public auth: AuthenticationService,
    public router: Router
  ) {}

  public onProviderBtnClick() {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['dashboard']);
    } else {
      this.auth.widget.open();
    }
  }
}
