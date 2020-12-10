import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public auth: AuthenticationService, public router: Router) {}
}
