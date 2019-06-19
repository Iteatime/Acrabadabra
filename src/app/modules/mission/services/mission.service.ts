import { Injectable } from '@angular/core';

import { Mission, Timesheet } from 'src/app/shared/models';
import { SerializationService } from 'src/app/shared/services/serialization/serialization.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  public mission = new Mission();
  public timesheet: Timesheet;

  constructor(
    private _serializer: SerializationService,
    private _auth: AuthenticationService,
  ) { }

  public getEditToken(): string {
    return this._serializer.serializeObject({
        mode: 'edit',
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

  createMission(data) {
    return fetch('/.netlify/functions/mission-create', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json();
    });
  }

  readAllMissions = () => {
    return fetch('/.netlify/functions/missions-read-all').then((response) => {
      return response.json();
    });
  }

  readByUser = () => {
    return fetch(`/.netlify/functions/missions-read-all/${this._auth.user.id}`).then( (response) => {
      return response.json();
    });
  }

  readById = () => {
    return fetch('/.netlify/functions/mission-read-all/').then((response) => {
      return response.json();
    });
  }

  deleteMission = (missionId) => {
    console.log(missionId);
    return fetch(`/.netlify/functions/mission-delete-by-id/${missionId}`, {
      method: 'POST',
    }).then(response => {
      console.log(response);
      return response.json();
    });
  }
}

