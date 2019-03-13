import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  public get user(): any {
    return this.widget.currentUser();
  }

  public get username(): string {
    return this.user.user_metadata.full_name;
  }

  public get widget(): any {
    return window['netlifyIdentity'];
  }

  public get isAuthenticated(): boolean {
    return !!this.user;
  }

  public constructor() {
    this.widget.init();
    this.widget.on('error', error => {
      if (error !== null && error.message.indexOf('Failed to load') !== -1) {
        localStorage.setItem('netlifySiteURL', '');
        alert('Un erreur est survenue, nous allons recharger la page');
        window.location.reload();
      }
    });
  }
}
