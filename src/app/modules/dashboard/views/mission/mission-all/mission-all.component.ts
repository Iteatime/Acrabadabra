import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

import { State } from '../../../@type';
import { Mission } from '../../../models';
import { MissionService, StoreService } from '../../../services';

interface MissionsByStatus {
  current: Mission[];
  future: Mission[];
  past: Mission[];
}

@Component({
  selector: 'app-mission-all',
  templateUrl: './mission-all.component.html',
})
export class MissionAllComponent implements OnInit {
  public ready: boolean;
  public missionsByStatus: MissionsByStatus = { current: [], future: [], past: [] };
  public headings = ['title', 'consultant', 'client', 'startDate', 'endDate'];

  constructor(
    private _missionService: MissionService,
    private _auth: AuthenticationService,
    public store: StoreService
  ) {}

  ngOnInit() {
    this.ready = false;
    this.updateMissions();
  }

  updateMissions(): void {
    this._missionService
      .readMissionsByCreator(this._auth.user.id)
      .then(response => {
        this.store.setState(
          { missions: response },
          (state: State) => {
            this.missionsByStatus = this.getMissionsByStatus(state.missions);
            this.ready = true;
          }
        );
      });
  }

  getMissionsByStatus(missions: Mission[]): MissionsByStatus {
    const missionsByStatus = {
      current: [],
      future: [],
      past: []
    };

    this.sortMissionsByDateDescending(missions).map(mission => {
      const status = this.getMissionStatus(mission);
      missionsByStatus[status] = [mission, ...missionsByStatus[status]];
    });

    return missionsByStatus;
  }

  getMissionStatus(mission: Mission): string {
    const currentDate = new Date();
    const startDate = new Date(mission.startDate);
    const endDate = new Date(mission.endDate);

    if (currentDate >= startDate && currentDate <= endDate) {
      return 'current';
    } else if (currentDate < startDate) {
      return 'future';
    }

    return 'past';
  }

  sortMissionsByDateDescending(missions: Mission[]): Mission[] {
    return missions.sort((missionA, missionB) => {
      const dateA = new Date(missionA.startDate);
      const dateB = new Date(missionB.startDate);

      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    });
  }
}
