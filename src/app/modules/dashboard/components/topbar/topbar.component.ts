import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

import { StoreService } from '../../services';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  constructor(
    public router: Router,
    public auth: AuthenticationService,
    public store: StoreService
  ) { }
}
