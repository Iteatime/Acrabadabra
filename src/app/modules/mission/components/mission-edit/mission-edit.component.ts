import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { MissionService } from '../../services/mission.service';
import { UrlShorteningService } from 'src/app/modules/timesheet/services/url-shortening.service';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { Company } from '@model/company.model';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.scss'],
})
export class MissionEditComponent {
  @ViewChild('missionForm', { static: true }) form: NgForm;
  showLink = false;
  commentary = false;
  editUrl = '';
  originUrl = window.location.origin;
  missionReference: string;
  isConsultantFreelance = false;

  constructor(
    public router: Router,
    public auth: AuthenticationService,
    public missionService: MissionService,
    private readonly notificationService: NotificationService,
    private readonly _urlShortener: UrlShorteningService,
  ) {}

  setShortUrl(action?: string): void {
    if (!!action) {
      const getToken = this.missionService.getEditToken();
      this._urlShortener
        .shortenUrl(this.originUrl + `/timesheet/${action}/` + getToken)
        .then(res => (this.editUrl = res));
      return;
    }

    ['edit', 'review'].forEach(mode => {
      this.setShortUrl(mode);
    });
  }

  onSubmit(): void {
    this.notificationService.dismissAll();
    if (!this.auth.isAuthenticated) {
      this.notificationService.push('Veuillez vous connecter', 'warning', { isSelfClosing: false });
    } else {
      if (this.form.valid) {
        if (!this.isConsultantFreelance) {
          this.missionService.mission.consultantCompany = new Company();
          this.missionService.mission.consultantBankAccountHolder = '';
          this.missionService.mission.consultantBankingAgency = '';
          this.missionService.mission.consultantBankingDomiciliation = '';
          this.missionService.mission.consultantBankIBAN = '';
          this.missionService.mission.consultantBankSWIFT = '';
        }
        this.missionService.mission.consultantFreelance = this.isConsultantFreelance;
        this.missionService.mission.missionCreator = this.auth.user.id;
        this.missionService
          .createMission(this.missionService.mission)
          .then(response => {
            this.reactToSubmition(false);
            this.missionReference = response.id;
            this.editUrl = this.originUrl + '/mission/' + this.missionReference + '/timesheet/create';
            this.router.navigate(['dashboard']);
          })
          .catch(error => {
            console.log('API error', error);
          });
      } else {
        this.reactToSubmition(true);
        this.showValidationMessages();
      }
    }
  }

  reactToSubmition(error: boolean): void {
    if (error) {
      this.notificationService.push('Veuillez vérifier votre saisie', 'warning', { isSelfClosing: false });
    } else {
      this.notificationService.push('Votre mission à été créée', 'success', { duration: 10 });
    }
    this.showLink = !error;
    if (this.showLink) {
      setTimeout(() => {
        document.getElementById('action-links').scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  reactToCopy(): void {
    this.notificationService.push(
      "Vous pouvez partager ce lien permettant la création d'un CRA intégrant les informations relatives à votre mission",
      'success',
      { duration: 15 },
    );
  }

  showValidationMessages(): void {
    Object.keys(this.form.controls).forEach(field => {
      this.form.controls[field].markAsTouched();
    });
  }
}
