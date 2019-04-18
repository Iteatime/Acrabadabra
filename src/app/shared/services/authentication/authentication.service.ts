import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public get user(): any {
    return this.widget.currentUser();
  }

  public get username(): string {
    if (this.user.user_metadata) {
      return this.user.user_metadata.full_name;
    }
    return null;
  }

  public get widget(): any {
    return window['netlifyIdentity'];
  }

  public get isAuthenticated(): boolean {
    return !!this.user;
  }

  public constructor() {
    this.widget.init();
  }
}
