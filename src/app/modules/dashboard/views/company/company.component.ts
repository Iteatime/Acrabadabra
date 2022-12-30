import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Company } from "../../../../shared/models";

import { State } from "../../@type";
import { CompanyService, StoreService } from "../../services";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
})
export class CompanyComponent implements OnInit {
  public ready: boolean;
  public company: Company = new Company("Test");

  constructor(
    private _companyService: CompanyService,
    public store: StoreService
  ) {}

  ngOnInit() {
    this.ready = false;

    if (!this.store.state.company) {
      this._companyService
        .readCompanyByOwnerId(this.store.state.user.id)
        .then((response) => {
          this.store.setState({ company: response }, (state: State) => {
            this.company = state.company || new Company();
            this.ready = true;
          });
        });
    } else {
      this.ready = true;
      this.company = this.store.state.company;
    }
  }

  private updateCompany(company: Company) {
    this._companyService
      .updateCompanyDetails(this.store.state.user.id, company)
      .then((response) => {
        this.store.setState({ company: response }, (state: State) => {
          if (this.company) this.company = state.company || new Company();
          this.ready = true;
        });
      });
  }

  onDetailsSubmit(form: NgForm) {
    this.updateCompany({
      ...this.company,
      ...form.value,
    });
  }
  onBankSubmit(form: NgForm) {
    this.updateCompany({
      ...this.company,
      bankAccount: form.value,
    } as any);
  }
}
