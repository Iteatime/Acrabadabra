import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  public user;

  constructor(
    private _auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this._auth.user;
  }

}
