import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  get user (): any {
    return this.widget.currentUser();
  }

  get username (): string {
    if (this.user.user_metadata) {
      return this.user.user_metadata.full_name;
    }
    return null;
  }

  get widget (): any {
    return window['netlifyIdentity'];
  }

  get isAuthenticated (): boolean {
    return !!this.user;
  }

  constructor () {
    this.widget.init();
  }
}
