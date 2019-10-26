import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

import { Alert, Message } from './@type';
import { StoreService } from './services';

moment.locale('fr');

const dummyMessages: Message[] = [
  {
    date: moment().subtract(2, 'days'),
    author: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
    },
    content: 'Lorem ipsum dolor sit amet...',
    status: 'unread',
  },
  {
    date: moment().subtract(5, 'days'),
    author: {
      name: 'Alice Right',
      email: 'alice.right@gmail.com',
    },
    content: 'Lorem ipsum dolor sit amet...',
    status: 'read',
  },
];

const dummyAlerts: Alert[] = [
  {
    date: moment().subtract(6, 'minutes'),
    type: 'warning',
    icon: 'exclamation-triangle',
    content: 'Les informations de l\'entreprise ne sont pas renseignées',
  },
  {
    date: moment().subtract(2, 'hours'),
    type: 'success',
    icon: 'thumbs-up',
    content: 'Bravo ! Vous avez créé votre première mission',
  },
  {
    date: moment().subtract(3, 'days'),
    type: 'info',
    icon: 'info',
    content: 'Bienvenue sur Acrabadaba !',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  constructor(
    private _auth: AuthenticationService,
    public store: StoreService
  ) {}

  ngOnInit() {
    const authUser = this._auth.user ? this._auth.user : null;
    const user = {
      id: authUser.id,
      email: authUser.email,
      name: authUser.user_metadata.full_name,
    };
    this.store.setState({
      alerts: dummyAlerts,
      messages: dummyMessages,
      user,
    });
  }
}
