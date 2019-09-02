import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

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
    this.update();
  }

  update(): void {
    this.missionService.readMissionsByCreator(this._auth.user.id)
    .then(response => {
      this.missionsArray$ = response;
    });
  }

  delete(id: any) {

  Swal.fire({
    title: 'Voulez vous supprimer cette mission ?',
    type: 'question',
    showCancelButton: true,
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
    reverseButtons: true,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.value) {
      this.missionService.deleteMission(id)
      .then((res) => {
        this.update();
        this.reactToSubmition(false);
      }).catch((error) => {
        this.reactToSubmition(true);
        console.log('error', error);
      });
    }});
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
        'Cette mission a été supprimée<br/>',
        'success',
        { duration: 10 }
      );
    }
  }
}
