import { Component, OnInit } from '@angular/core';

import { MissionService } from 'src/app/modules/mission/services/mission.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { Mission } from 'src/app/shared/models/mission.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit {

  // TODO: move this to a store at the dashboard level
  public missions = {
    current: 0,
    future: 0,
    total: 0,
  };

  public messages = {
    new: 0,
  };

  constructor(
    private _missionService: MissionService,
    private _auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.updateMissions();
  }

  updateMissions(): void {
    this._missionService.readMissionsByCreator(this._auth.user.id)
    .then(response => {
      this.setMissionsLength(response);
    });
  }

  setMissionsLength(missions): void {
    this.missions = {
      current: this.currentMissions(missions),
      future: this.futureMissions(missions),
      total: this.totalMissions(missions),
    };
  }

  currentMissions(missions: Mission[]): number {
    const currentDate = new Date();

    return missions.filter(mission => {
      const startDate = new Date(mission.startDate);
      const endDate = new Date(mission.endDate);

      return currentDate >= startDate && currentDate <= endDate;
    }).length;
  }

  futureMissions(missions: Mission[]): number {
    const currentDate = new Date();

    return missions.filter(mission => {
      const startDate = new Date(mission.startDate);

      return currentDate > startDate;
    }).length;
  }

  totalMissions(missions: Mission[]): number {
    return missions.length;
  }

}
