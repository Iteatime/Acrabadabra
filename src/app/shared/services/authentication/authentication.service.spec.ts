import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { SharedModuleModule } from '../../modules/shared-module/shared-module.module';
import { AppModule } from 'src/app/app.module';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';
import { TimesheetModule } from 'src/app/modules/timesheet/timesheet.module';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let widgetInit: any;

  beforeEach(() => {
    widgetInit = spyOn(window['netlifyIdentity'], 'init');
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [

    ],
    providers: []
    });
    service = TestBed.get(AuthenticationService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should init the widget', () => {
    expect(widgetInit).toHaveBeenCalled();
  });
});
