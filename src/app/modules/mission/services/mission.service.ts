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

  // public getEditToken(): string {
  //   return this._serializer.serializeObject({
  //       timesheet: Object.assign({}, new Timesheet(), {
  //         consultant: {
  //           name: this.mission.consultant,
  //           email: this.mission.consultantEmail
  //         },
  //         mission: {
  //           client: this.mission.client,
  //           title: this.mission.title
  //         }
  //       })
  //   });
  // }

  createMission(data) {

    return fetch('/.netlify/functions/mission-create', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json();
    });
  }

}

