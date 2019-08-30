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

const objectMatchesOriginal = (original: object, copy: object) => {
  // Exclude object id and relations to other objects from check
  const properties = Object.keys(original).filter(key => key !== 'id' && typeof original[key] !== 'object');
  // Check that all properties match between the source object and the returned object
  for (let property of properties) {
    if (original[property] !== copy[property]) {
      return false;
    }
  }
  return true;
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
      expect(objectMatchesOriginal(mission, returnedMission)).toEqual(true);
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

    it('should return a copy of the desired object', async () => {
      returnedMission = await service.readMission(id);
      expect(returnedMission).toBeTruthy();
      expect(Array.isArray(returnedMission)).toBeFalsy();
      expect(objectMatchesOriginal(mission, returnedMission)).toEqual(true);
    });

    it('should return an empty response on valid, but non-existing id', async() => {
      returnedMission = await service.readMission('0cf7d063bf28b4fd52532df165ebb0b8ecf664856f58c00afb410867637184387570');
      expect(returnedMission).toBeFalsy();
    })
  });

  describe('updateMission()', async () => {
    beforeEach(() => {
      mission = new Mission();
      mission.title = 'Modified Dummy Title';
    });

    it('should return a copy of the sent object, save for the encrypted id', async () => {
      const returnedMission: Mission = await service.updateMission(id, mission);
      expect(objectMatchesOriginal(mission, returnedMission)).toEqual(true);
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
      const error = await asyncError(service.deleteMission, 'aaaaaa');
      expect(error).toBeTruthy();
      expect(error.message).toEqual('Request failed with status code 400');
    });

    it('should remove an entry from database', async () => {
      await service.deleteMission(id);
      const missions: Mission[] = await service.readAllMissions();
      expect(missions.length).toEqual(count);
      const mission: Mission = await service.readMission(id);
      console.log('Deleted Mission: ', mission);
      expect(mission).toBeFalsy();
    });
  });
});
