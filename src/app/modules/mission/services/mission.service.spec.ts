import { TestBed } from '@angular/core/testing';

import { MissionService } from './mission.service';
import { Mission } from 'src/app/shared/models';

describe('MissionService', () => {
  let service: MissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('readAllMissions()', async () => {
    let missions: Mission[];

    beforeEach(async () => {
      missions = await service.readAllMissions();
    });

    it('should be not null', () => {
      expect(missions).toBeTruthy();
    });

    it('should return an array', () => {
      expect(Array.isArray(missions)).toBeTruthy();
    });
  });
});
