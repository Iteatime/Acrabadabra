import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  // TODO: db table for company infos

  constructor(
    private _auth: AuthenticationService
  ) { }

  ngOnInit() {
    console.log(this._auth.user);
  }

}
