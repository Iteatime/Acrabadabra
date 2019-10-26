import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

import { Alert, Message, State } from '../../@type';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _state: State = {
    alerts: [],
    messages: [],
    missions: [],
    user: null,
    company: null
  };

  constructor(public auth: AuthenticationService) { }

  public get state(): State {
    return this._state;
  }

  public setState(state: State, callback: Function = null): void {
    this._state = Object.assign({}, this._state, state);

    if (callback) {
      callback(this.state);
    }
  }

  public pushAlert(alert: Alert): void {
    const alerts = [...this.state.alerts, alert];
    alerts.sort((a, b) => {
      if (moment(a.date) > moment(b.date)) {
        return -1;
      }
      if (moment(a.date) < moment(b.date)) {
        return 1;
      }
      return 0;
    });
    this.setState({ alerts });
  }

  public pushMessage(message: Message): void {
    this.setState({ messages: [...this.state.messages, message] });
  }
}
