import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  constructor(public auth: AuthenticationService, public router: Router) {}

  onProviderBtnClick(): void {
    this.auth.isAuthenticated ? this.router.navigate(['dashboard']) : this.auth.widget.open();
  }
}
