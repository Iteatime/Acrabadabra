import { TestBed } from '@angular/core/testing';

import { MissionService } from './mission.service';
import { Mission } from 'src/app/shared/models';

const asyncError = async (functionToTest: Function, ...otherArgs: any[]): Promise<Error> => {
  let error;
  try {
      const result = await functionToTest(...otherArgs);
  } catch (e) {
      error = e;
  }
  return error;
}

describe('MissionService', () => {
  let service: MissionService;
  let id: string;
  let mission: Mission;
  let count: number;

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
      count = missions.length;
    });

    it('should always return a non-null value', () => {
      expect(missions).toBeTruthy();
    });

    it('should always return an array', () => {
      expect(Array.isArray(missions)).toBeTruthy();
    });
  });

  describe('createMission()', async () => {
    beforeEach(() => {
      mission = new Mission();
      mission.title = 'Dummy Title';
    });

    it('should return a copy of the sent object along with an id', async () => {
      const returnedMission: Mission = await service.createMission(mission);
      // Exclude ID and relations to other objects from check
      const properties = Object.keys(mission).filter(key => key !== 'id' && typeof mission[key] !== 'object');
      // Check that all properties match between the source object and the returned object
      for (let property of properties) {
        expect(mission[property] === returnedMission[property]).toBeTruthy();
      }
      expect(returnedMission.hasOwnProperty('id')).toBeTruthy();
      id = returnedMission.id;
    });

    it('should create an additional entry in database', async () => {
      const missions: Mission[] = await service.readAllMissions();
      expect(missions.length).toEqual(count + 1);
    })
  });

  describe('readMission()', async () => {
    let returnedMission: Mission;

    it('should raise an exception on empty id', async () => {
      for (let missionId of [null, undefined, '']) {
        const error = await asyncError(service.readMission, missionId);
        expect(error).toBeTruthy();
        expect(error.message).toEqual('Must specify an ID');
      }
    });

    it('should get a \'bad request\' error code (400) from server on undecryptable id', async () => {
      const error = await asyncError(service.readMission, 'aaaaaa');
      expect(error).toBeTruthy();
      expect(error.message).toEqual('Request failed with status code 400');
    });

    it('should return exactly one mission object on valid id', async () => {
      returnedMission = await service.readMission(id);
      expect(returnedMission).toBeTruthy();
      expect(Array.isArray(returnedMission)).toBeFalsy();
    });
  });

  describe('updateMission()', async () => {
    beforeEach(() => {
      mission = new Mission();
      mission.title = 'Modified Dummy Title';
    });

    it('should return a copy of the sent object, save for the encrypted id', async () => {
      const returnedMission: Mission = await service.updateMission(id, mission);
      // Exclude object id and relations to other objects from check
      const properties = Object.keys(mission).filter(key => key !== 'id' && typeof mission[key] !== 'object');
      // Check that all properties match between the source object and the returned object
      for (let property of properties) {
        expect(mission[property] === returnedMission[property]).toBeTruthy();
      }
      expect(returnedMission.hasOwnProperty('id')).toBeTruthy();
      id = returnedMission.id;
    });

    it('should not change the count of entries in database', async () => {
      const missions: Mission[] = await service.readAllMissions();
      expect(missions.length).toEqual(count + 1);
    })
  });

  describe('deleteMission()', async () => {
    it('should get a \'bad request\' error code (400) from server on undecryptable id', async () => {
      const error = await asyncError(service.readMission, 'aaaaaa');
      expect(error).toBeTruthy();
      expect(error.message).toEqual('Request failed with status code 400');
    });

    it('should return exactly one mission object on valid id', async () => {
      const result = await service.deleteMission(id);
      expect(result).toEqual(true);
    });

    it('should remove an entry from database', async () => {
      const missions: Mission[] = await service.readAllMissions();
      expect(missions.length).toEqual(count);
    })
  });
});
