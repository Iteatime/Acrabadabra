import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { set } from "lodash";
import { Mission } from "../../../../../shared/models";
import { MissionService } from "../../../../../shared/services/missions/missions.service";

import { State } from "../../../@type";
import { Company } from "../../../models";
import { CompanyService, StoreService } from "../../../services";

@Component({
  selector: "app-mission-create",
  templateUrl: "./mission-create.component.html",
})
export class MissionCreateComponent implements OnInit {
  public ready: boolean;
  public company: Company;

  constructor(
    private companies: CompanyService,
    private missions: MissionService,
    public store: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ready = false;

    if (!this.store.state.company) {
      this.companies
        .readCompanyByOwnerId(this.store.state.user.id)
        .then((response) => {
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

  async onSubmit(form: NgForm) {
    const parts = Object.entries(form.value).reduce(
      (o, [key, value]) => set(o, key, value),
      {}
    ) as Mission;

    (parts as any).creatorId = this.store.state.user.id;

    const res = await this.missions.createMission(parts);
    this.router.navigate(["dashboard/mission/all"]);
  }
}
