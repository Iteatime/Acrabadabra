import { Component, OnInit } from '@angular/core';

import { User } from '../../@type';
import { StoreService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(public store: StoreService) {}

  ngOnInit() {
    this.user = this.store.state.user;
  }
}
