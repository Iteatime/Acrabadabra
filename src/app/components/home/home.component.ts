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
    this.auth.widget.open();

    this.auth.widget.on('close', () => {
      if (this.auth.isAuthenticated) {
        this.router.navigate(['timesheet', 'create']);
      }
    });
  }
}
