import { Injectable } from '@angular/core';
import axios from 'axios';
import { SerializationService } from 'src/app/shared/services/serialization/serialization.service';
import { Mission } from '@model/mission.model';
import { Timesheet } from '@model/timesheet.model';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  mission = new Mission();
  timesheet: Timesheet;

  constructor(private readonly _serializer: SerializationService) {}

  getEditToken(): string {
    return this._serializer.serializeObject({
      mode: 'edit',
      timesheet: this.timesheet,
    });
  }

  private readonly crud = async (method: string, id?: string, payload?: any): Promise<any> => {
    try {
      if (typeof axios[method] === 'undefined') {
        throw new Error(`Invalid REST method: '${method}'`);
      }
      const uri = `/.netlify/functions/missions${id ? `/${id}` : ''}`;
      const response = await axios[method](uri, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  createMission = async (data: Mission): Promise<Mission> => {
    return this.crud('post', null, data);
  };

  readAllMissions = async (): Promise<Mission[]> => {
    return this.crud('get');
  };

  readMission = async (missionId: string): Promise<Mission> => {
    if (!missionId) {
      throw new Error('Must specify an ID');
    }
    return this.crud('get', missionId);
  };

  readMissionsByCreator = async (creatorId: string): Promise<Mission[]> => {
    if (!creatorId) {
      throw new Error('Must specify an ID');
    }
    return this.crud('get', 'user/' + creatorId);
  };

  updateMission = async (missionId: string, data: Mission): Promise<Mission> => {
    return this.crud('put', missionId, data);
  };

  deleteMission = async (missionId: string): Promise<boolean> => {
    await this.crud('delete', missionId);
    return true;
  };
}
