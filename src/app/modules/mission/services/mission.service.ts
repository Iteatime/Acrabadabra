import { Injectable } from '@angular/core';

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

  public getEditToken(): string {
    return this._serializer.serializeObject({
        mode: 'edit',
        timesheet: this.timesheet
    });
  }

  createMission(data) {
    return fetch('/.netlify/functions/mission-create', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json();
    });
  }

  createIndex = () => {
    return fetch('/.netlify/functions/mission-create-index').then(response => {
      return response.json();
    });
  }

  readAllMissions = () => {
    return fetch('/.netlify/functions/missions-read-all').then((response) => {
      return response.json();
    });
  }

  readById = (missionId) => {
    return fetch(`/.netlify/functions/mission-read-by-id/${missionId}`).then((response) => {
      return response.json();
    });
  }

  updateMission = (missionId, data) => {
    return fetch(`/.netlify/functions/mission-update-by-id/${missionId}`, {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json();
    })
  }

  deleteMission = (missionId) => {
    return fetch(`/.netlify/functions/mission-delete-by-id/${missionId}`, {
      method: 'POST',
    }).then(response => {
      return response.json();
    });
  }
}

