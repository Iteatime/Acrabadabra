import { Injectable } from '@angular/core';
import axios from 'axios';

import { Mission, Timesheet } from 'src/app/shared/models';
import { SerializationService } from 'src/app/shared/services/serialization/serialization.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  public mission = new Mission();
  public timesheet: Timesheet;

  constructor(private _serializer: SerializationService) { }

  public getCreateToken(): string {
    return this._serializer.serializeObject({
        mode: 'create',
        timesheet: Object.assign({}, new Timesheet(), {
          consultant: {
            name: this.mission.consultant,
            email: this.mission.consultantEmail
          },
          mission: {
            client: this.mission.client,
            title: this.mission.title
          }
        })
    });
  }

  private crud = async (method: string, id?: string, payload?: any): Promise<any> => {
    try {
      const uri = `/.netlify/functions/missions${id ? `/${id}` : ''}`;
      const response = await axios[method](uri, payload);
      return response.data;
    } catch(error) {
      throw error;
    }
  }

  createMission = async (data): Promise<Mission> => {
    const result = await this.crud('post', null, data);
    return result;
  }

  readAllMissions = async (): Promise<Mission[]> => {
    const result = await this.crud('get');
    return result;
  }

  readMission = async (missionId): Promise<Mission> => {
    const result = await this.crud('get', missionId);
    return result;
  }

  updateMission = async (missionId, data): Promise<Mission> => {
    const result = await this.crud('put', missionId, data);
    return result;
  }

  deleteMission = async (missionId): Promise<boolean> => {
    const result = await this.crud('delete', missionId);
    return true;
  }
}

