import { Component, OnInit } from '@angular/core';

import { State } from '../../@type';
import { Company } from '../../models';
import { CompanyService, StoreService } from '../../services';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {
  public ready: boolean;
  public company: Company = new Company();

  constructor(
    private _companyService: CompanyService,
    public store: StoreService
  ) { }

  ngOnInit() {
    this.ready = false;

    if (!this.store.state.company) {
      this._companyService
        .readCompanyByOwnerId(this.store.state.user.id)
        .then(response => {
          this.store.setState({ company: response }, (state: State) => {
            this.company = state.company;
            this.ready = true;
          });
        });
    } else {
      this.ready = true;
      this.company = this.store.state.company;
    }
  }
}
