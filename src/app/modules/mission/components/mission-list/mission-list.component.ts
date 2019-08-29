import { Component, OnInit } from '@angular/core';

import { MissionService } from '../../services/mission.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {

  missionsArray$: any [] = [];
  editUrl: string = '';
  originUrl = window.location.origin;
  missionReference: string;

  constructor(public missionService: MissionService,
              private _auth: AuthenticationService,
              private _notificationService: NotificationService ) { }

  ngOnInit() {
    this.getAllMissions();
  }

  getAllMissions(): any {
    this.missionsArray$ = [];
    this.missionService.readAllMissions().then(response => {
      response.forEach(mission => {
        if (mission.data.missionCreator === this._auth.user.id) {
          mission.data.id = mission.ref['@ref'].id;
          // this.missionsArray$[mission.data.id].push(mission.data);
          this.missionsArray$.push(mission.data);
        } else {
          this.missionsArray$ = [];
        }
      });
    });
  }

  delete(id: any) {
    if ( confirm( "Etes vous sur de vouloir supprimer cette mission ?" ) ) {
      this.missionService.deleteMission(id)
      .then((res) => {
        this.getAllMissions();
        this.reactToSubmition(false);
      }).catch((error) => {
        this.reactToSubmition(true);
        console.log('error', error);
      });
    } else {
    }
  }

  copyLinkToTimesheet() {
    this._notificationService.push(
      'Vous pouvez partager ce lien permettant la création d\'un CRA intégrant les informations relatives à votre mission',
      'success',
      { duration: 15 }
    );
  }

  reactToSubmition(error: boolean): void {
    if (error) {
      this._notificationService.push('La suppression de la mission à échouée', 'warning', { isSelfClosing: false });
    } else {
      this._notificationService.push(
        'Cette mission à été supprimée<br/>',
        'success',
        { duration: 10 }
      );
    }
  }
}
