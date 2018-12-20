import { TestBed } from '@angular/core/testing';

import { TimesheetService } from './timesheet.service';

describe('TimesheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimesheetService = TestBed.get(TimesheetService);
    expect(service).toBeTruthy();
  });
});
