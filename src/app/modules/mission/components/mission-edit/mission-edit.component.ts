import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UrlShorteningService } from 'src/app/modules/timesheet/services/url-shortening.service';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { Title } from '@angular/platform-browser';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.scss']
})
export class MissionEditComponent implements OnInit {

  @ViewChild('missionForm') form: NgForm;
  showLink = false;
  commentary = false;
  editShortUrl: string = '';
  originUrl = window.location.origin;

  constructor(
    public router: Router,
    public auth: AuthenticationService,
    private notificationService: NotificationService,
    private _urlShortener: UrlShorteningService,
    public missionService: MissionService,
  ) {}

  ngOnInit(): void {
  }

  openAuth() {
    this.auth.widget.open();
  }

  setShortUrl(action?: string): void {
    if (!!action) {
      const getToken = this.missionService.getEditToken();
      this._urlShortener.shortenUrl(this.originUrl + `/timesheet/${action}/` + getToken)
        .then ((res) => {
          this.editShortUrl = res;
        });
      return;
    }

    ['edit', 'review'].forEach(mode => {
      this.setShortUrl(mode);
    });
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
          console.log('API response', response)
        }).catch((error) => {
          console.log('API error', error);
        });
        this.setShortUrl('edit');
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

  showValidationMessages(): void {
    Object.keys(this.form.controls).forEach(field => {
      this.form.controls[field].markAsTouched();
    });
  }

  onUserInput() {
    this.showLink = false;
  }

}
