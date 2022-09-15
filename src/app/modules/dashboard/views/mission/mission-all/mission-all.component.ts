import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { environment } from "../../../../../../environments/environment";
import { Mission } from "../../../../../shared/models";
import { MissionService } from "../../../../../shared/services/missions/missions.service";

import { State } from "../../../@type";
import { StoreService } from "../../../services";

interface MissionsByStatus {
  current: Mission[];
  future: Mission[];
  past: Mission[];
}

@Component({
  selector: "app-mission-all",
  templateUrl: "./mission-all.component.html",
  styleUrls: ["./mission-all.component.scss"],
})
export class MissionAllComponent implements OnInit {
  public ready: boolean;
  public missionsByStatus: MissionsByStatus = {
    current: [],
    future: [],
    past: [],
  };
  public missionsCount: number;
  public headings = ["title", "consultant", "client", "startDate", "endDate"];

  constructor(
    private _missionService: MissionService,
    private _auth: AuthenticationService,
    public store: StoreService
  ) {}

  ngOnInit() {
    this.ready = false;
    this.loadMissions();
  }

  async loadMissions() {
    const missions = await this._missionService.readMissionsByCreator(
      this._auth.user.id
    );

    this.store.setState({ missions }, (state: State) => {
      this.missionsByStatus = this.getMissionsByStatus(state.missions);
      this.ready = true;
      this.missionsCount = missions.length;
    });
  }

  getMissionsByStatus(missions: Mission[]): MissionsByStatus {
    const missionsByStatus = {
      current: [],
      future: [],
      past: [],
    };

    this.sortMissionsByDateDescending(missions).map((mission) => {
      const status = this.getMissionStatus(mission as any);
      missionsByStatus[status] = [mission, ...missionsByStatus[status]];
    });

    return missionsByStatus;
  }

  getMissionStatus(mission: Mission): string {
    const currentDate = new Date();
    const startDate = new Date(mission.startDate);
    const endDate = new Date(mission.endDate);

    if (currentDate >= startDate && currentDate <= endDate) {
      return "current";
    } else if (currentDate < startDate) {
      return "future";
    }

    return "past";
  }

  sortMissionsByDateDescending(missions: Mission[]): Mission[] {
    return missions.sort((missionA, missionB) => {
      const dateA = new Date(missionA.startDate);
      const dateB = new Date(missionB.startDate);

      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    });
  }

  getMissionTimesheetLink(id: string) {
    return `${window.location.host}/timesheet/create?mission=${id}`;
  }

  async deleteMission(id: string) {
    this.ready = false;
    await this._missionService.deleteMission(id);
    await this.loadMissions();
  }
}
