import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
	let service: AuthenticationService;
	let widgetInit: any;

	beforeEach(() => {
		widgetInit = spyOn(window['netlifyIdentity'], 'init');
		TestBed.configureTestingModule({});
		service = TestBed.get(AuthenticationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should init the widget', () => {
		expect(widgetInit).toHaveBeenCalled();
	});
});
