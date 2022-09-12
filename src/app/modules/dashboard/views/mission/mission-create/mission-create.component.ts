import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { set } from "lodash";
import { Company, Mission } from "../../../../../shared/models";
import { BankAccount } from "../../../../../shared/models/bank-account.model";
import { MissionService } from "../../../../../shared/services/missions/missions.service";

import { State } from "../../../@type";
import { CompanyService, StoreService } from "../../../services";

function getCompanyForm(fb: FormBuilder, company?: Company) {
  return fb.group({
    name: [company?.name],
    address: [company?.address],
    zipCode: [company?.zipCode],
    city: [company?.city],
    phone: [company?.phone],
    siren: [company?.siren],
    tradeAndCompaniesRegisterCity: [company?.tradeAndCompaniesRegisterCity],
    vatNumber: [company?.vatNumber],
    bankAccount: fb.group({
      holder: [company?.bankAccount?.holder],
      swift: [company?.bankAccount?.swift],
      iban: [company?.bankAccount?.iban],
      domiciliation: [company?.bankAccount?.domiciliation],
      agency: [company?.bankAccount?.agency],
    }),
  });
}

function getCompanyFromForm(base: any) {
  const account = base.bankAccount;
  console.log(base);
  const company = new Company(
    base.name,
    base.address,
    base.zipCode,
    base.city,
    base.phone,
    base.siren,
    base.tradeAndCompaniesRegisterCity,
    base.tradeAndCompaniesRegisterExemption,
    base.vatNumber,
    base.vatExemption,
    new BankAccount(
      account.holder,
      account.agency,
      account.domiciliation,
      account.iban,
      account.swift
    )
  );

  return company;
}

@Component({
  selector: "app-mission-create",
  templateUrl: "./mission-create.component.html",
})
export class MissionCreateComponent implements OnInit {
  public ready: boolean;
  public company: Company;
  public form: FormGroup;

  constructor(
    private companies: CompanyService,
    private missions: MissionService,
    public store: StoreService,
    private router: Router,
    private fb: FormBuilder
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
            this.initForm();
          });
        });
    } else {
      this.ready = true;
      this.company = this.store.state.company;
      this.initForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: [""],
      startDate: [""],
      endDate: [""],
      unitOfWorkType: ["days"],
      unitOfWorkPrice: [""],
      client: this.fb.group({
        ref: [""],
        email: [""],
        company: getCompanyForm(this.fb),
      }),
      consultant: this.fb.group({
        name: [""],
        email: [""],
        isFreelance: [false],
        company: getCompanyForm(this.fb),
      }),
      provider: getCompanyForm(this.fb, this.company),
      paymentDetails: this.fb.group({
        penalties: [false],
        mode: [""],
      }),
    });

    this.form.valueChanges.subscribe((e) => console.log(e.consultant.company));
  }

  get isConsultantFreelance() {
    return this.form.get("consultant.isFreelance").value as boolean;
  }

  async onSubmit() {
    const mission = new Mission();

    const values = this.form.value;
    mission.title = values.title;
    mission.startDate = values.startDate;
    mission.endDate = values.endDate;
    mission.creatorId = this.store.auth.user.id;
    mission.unitOfWorkType = values.unitOfWorkType;
    mission.unitOfworkPrice = values.unitOfWorkPrice;

    mission.consultant = {
      name: values.consultant.name,
      email: values.consultant.email,
      isFreelance: values.consultant.isFreelance,
      company: getCompanyFromForm(values.consultant.company),
    };

    mission.client = {
      ref: values.client.ref,
      email: values.client.email,
      company: getCompanyFromForm(values.client.company),
    };

    mission.paymentDetails = {
      mode: values.paymentDetails.mode,
      penalties: values.paymentDetails.penalties,
    };

    mission.provider = getCompanyFromForm(values.provider);
    console.log(mission);
    const res = await this.missions.createMission(mission);
    this.router.navigate(["dashboard/mission/all"]);
  }
}
