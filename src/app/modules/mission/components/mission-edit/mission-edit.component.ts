import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.scss']
})
export class MissionEditComponent implements OnInit {

  @ViewChild('missionForm') form: NgForm;
  showLink = false;
  editUrl: string = '';
  originUrl = window.location.origin;
  missionReference: string;

  constructor(
    public router: Router,
    public auth: AuthenticationService,
    public missionService: MissionService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
  }

  openAuth() {
    this.auth.widget.open();
  }

  onSubmit() {
    this.notificationService.dismissAll();
    if (!this.auth.isAuthenticated) {
      this.notificationService.push('Veuillez vous connecter', 'warning', { isSelfClosing: false });
    } else {
      if (this.checkFormsValidity()) {
        this.missionService.mission.missionCreator = this.auth.user.id;
        this.reactToSubmition(false);
        this.missionService.createMission(this.missionService.mission).then((response) => {
          this.missionReference = response.ref['@ref'].id;
          this.editUrl = this.originUrl + '/mission/' + this.missionReference + '/timesheet/create';
        }).catch((error) => {
          console.log('API error', error);
        });

      } else {
        this.reactToSubmition(true);
        this.showValidationMessages();
      }
    }
  }

  checkFormsValidity(): boolean {
    const valid = this.form.valid;
    return valid;
  }

  reactToSubmition(error: boolean): void {
    if (error) {
      this.notificationService.push('Veuillez vérifier votre saisie', 'warning', { isSelfClosing: false });
    } else {
      this.notificationService.push(
        'Votre mission à été créée',
        'success',
        { duration: 10 }
      );
    }
    this.showLink = !error;
    if (this.showLink) {
      setTimeout(() => {
        document.getElementById('action-links').scrollIntoView({behavior:"smooth"});
      });
    }
  }

  reactToCopy(): void {
      this.notificationService.push(
        'Vous pouvez partager ce lien permettant la création d\'un CRA intégrant les informations relatives à votre mission',
        'success',
        { duration: 15 }
      );
  }

  showValidationMessages(): void {
    Object.keys(this.form.controls).forEach(field => {
      this.form.controls[field].markAsTouched();
    });
  }

  onUserInput() {
    this.showLink = false;
  }

}
