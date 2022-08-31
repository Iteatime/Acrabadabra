import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { MissionService } from "../../../../shared/services/missions/missions.service";

import { Mission } from "../../models";
import { StoreService } from "../../services";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
})
export class ActivityComponent implements OnInit {
  // TODO: move this to a store at the dashboard level
  public missions = {
    current: 0,
    future: 0,
  };

  public ready: boolean;

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
      .then((response) => {
        this.setMissionsLength(response);
        this.ready = true;
      });
  }

  setMissionsLength(missions): void {
    this.missions = {
      current: this.getCurrentMissionsCount(missions),
      future: this.getFutureMissionsCount(missions),
    };
  }

  getCurrentMissionsCount(missions: Mission[]): number {
    const currentDate = new Date();

    return missions.filter((mission) => {
      const startDate = new Date(mission.startDate);
      const endDate = new Date(mission.endDate);

      return currentDate >= startDate && currentDate <= endDate;
    }).length;
  }

  getFutureMissionsCount(missions: Mission[]): number {
    const currentDate = new Date();

    return missions.filter((mission) => {
      const startDate = new Date(mission.startDate);

      return currentDate < startDate;
    }).length;
  }
}
