import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router
  ) {
    const widget = this.widget;
    widget.init();
    widget.on('login', () => {
      widget.close();
      this.router.navigate(['dashboard']);
    });
    widget.on('logout', () => {
      this.router.navigate(['']);
    });
  }

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
}
