import { Component } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	public constructor(public auth: AuthenticationService) {}
}
