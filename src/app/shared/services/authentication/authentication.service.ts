import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly router: Router) {
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

  get user(): any {
    return this.widget.currentUser();
  }

  get username(): string {
    if (this.user.user_metadata) {
      return this.user.user_metadata.full_name;
    }
    return null;
  }

  get widget(): any {
    return window['netlifyIdentity'];
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }
}
