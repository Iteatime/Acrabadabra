import { TestBed } from '@angular/core/testing';

import { CanActivateTimesheetModeService } from './can-activate-timesheet-mode.service';

describe('CanActivateTimesheetModeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanActivateTimesheetModeService = TestBed.get(CanActivateTimesheetModeService);
    expect(service).toBeTruthy();
  });
});
