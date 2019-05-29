import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UrlShorteningService } from 'src/app/modules/timesheet/services/url-shortening.service';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { Title } from '@angular/platform-browser';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.scss']
})
export class MissionEditComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  originUrl = window.location.origin;
  editShortUrl: string = '';
  reviewShortUrl: string = '';
  submitMessage: any = null;
  public myTodo = { title: 'What I had for breakfast ..',
                    completed: true };


  constructor(
    public auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private _urlShortener: UrlShorteningService,
    public missionService: MissionService
  ) {}

  ngOnInit(): void {
    // this.form.valueChanges.subscribe(() => {
    //   if (this.form.dirty) {
    //     this.onUserInput();
    //   }
    // });
    // this.titleService.setTitle(`Acrabadabra - ${ this.getModeTitle() } un compte rendu d'activité`);
  }

  openAuth() {
    this.auth.widget.open();
  }


  // setShortUrl(action?: string): void {
  //   if (!!action) {
  //     const getToken = (action === 'edit') ? this.timesheetService.getEditToken() : this.timesheetService.getReviewToken();
  //     this._urlShortener.shortenUrl(this.originUrl + `/timesheet/${action}/` + getToken)
  //       .then ((res) => {
  //         action === 'edit' ? this.editShortUrl = res : this.reviewShortUrl = res;
  //         this.updateMailtoLink();
  //       });
  //     return;
  //   }

  //   ['edit', 'review'].forEach(mode => {
  //     this.setShortUrl(mode);
  //   });
  // }

  onSubmit() {
    // this.notificationService.dismissAll();
    // if (this.checkFormsValidity()) {
    //   this.reactToSubmition(false);
    // } else {
    //   this.reactToSubmition(true);
    //   this.showValidationMessages();
    // }

    // create it!
    this.missionService.createTodo(this.myTodo).then((response) => {
      console.log('API response', response);
      // set app state
    }).catch((error) => {
      console.log('API error', error);
    });

    // this.missionService.readAll();

    // this.missionService
    //   .createMission(this.missionService.mission)
    //   .subscribe(data => this.handleSuccess(data), error => this.handleError(error));
  }

  // reactToSubmition(error: boolean): void {
  //   if (error) {
  //     this.notificationService.push('Veuillez vérifier votre saisie', 'warning', { isSelfClosing: false });
  //   } else {
  //     this.notificationService.push(
  //       'Votre CRA est validé<br/>Si vous le modifiez, vous devrez le valider à nouveau et utiliser le nouveau lien de partage.',
  //       'success',
  //       { duration: 10 }
  //     );
  //   }
  //   this.showLinks = !error;
  //   if (this.showLinks) {
  //     setTimeout(() => {
  //       document.getElementById('action-links').scrollIntoView({behavior:"smooth"});
  //     });
  //   }
  // }


  // checkFormsValidity(): boolean {
  //   let valid = this.form.valid;
  //   if (this.generateInvoice) {
  //     valid = valid && this.invoiceForm.form.valid;
  //   }
  //   return valid;
  // }

  // showValidationMessages(): void {
  //   Object.keys(this.form.controls).forEach(field => {
  //     this.form.controls[field].markAsTouched();
  //   });
  //   if (this.generateInvoice) {
  //     Object.keys(this.invoiceForm.form.controls).forEach(field => {
  //       this.invoiceForm.form.controls[field].markAsTouched();
  //     });
  //   }
  //   if (this.timesheetService.timesheet.commutes.length === 0
  //       && this.timesheetService.timesheet.miscellaneous.length === 0
  //       && this.timesheetService.timesheet.flatFees.length === 0
  //       && this.generateExpenses) {
  //     this.notificationService.push('Vous n\'avez ajouté aucun frais', 'warning', { isSelfClosing: false });
  //   }
  // }

}
