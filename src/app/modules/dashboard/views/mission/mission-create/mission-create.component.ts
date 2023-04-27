import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { set } from "lodash";
import { Company, Mission } from "../../../../../shared/models";
import { BankAccount } from "../../../../../shared/models/bank-account.model";
import { MissionService } from "../../../../../shared/services/missions/missions.service";
import { NotificationService } from "src/app/modules/notification/services/notification.service";
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
    tradeAndCompaniesRegisterExemption: [
      company?.tradeAndCompaniesRegisterExemption,
    ],
    vatNumber: [company?.vatNumber],
    vatExemption: [company?.vatExemption],
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
    private notificationService: NotificationService,
    private companies: CompanyService,
    private missions: MissionService,
    public store: StoreService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

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
      freelanceUnitOfWorkPrice: [""],
      client: this.fb.group({
        ref: [""],
        email: [""],
        company: getCompanyForm(this.fb),
      }),
      consultant: this.fb.group({
        name: [""],
        email: [""],
        isFreelance: [true],
        unitOfWorkPrice: [],
        company: getCompanyForm(this.fb),
      }),
      provider: getCompanyForm(this.fb, this.company),
      paymentDetails: this.fb.group({
        penalties: [false],
        mode: [""],
      }),
    });
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('mission')) {
      const id = urlParams.get('mission');
      this.missions.readMission(id).then((mission) => {
        this.form = this.fb.group({
          title: [mission.title],
          startDate: [mission.startDate],
          endDate: [mission.endDate],
          unitOfWorkType: [mission.unitOfWorkType],
          unitOfWorkPrice: [mission.unitOfworkPrice],
          freelanceUnitOfWorkPrice: [mission.freelanceUnitOfworkPrice],
          client: this.fb.group({
            ref: [mission.client.ref],
            email: [mission.client.email],
            company: getCompanyForm(this.fb, mission.client.company),
          }),
          consultant: this.fb.group({
            name: [mission.consultant.name],
            email: [mission.consultant.email],
            isFreelance: [mission.consultant.isFreelance],
            unitOfWorkPrice: [mission.consultant.unitOfWorkPrice],
            company: getCompanyForm(this.fb, mission.consultant.company),
          }),
          provider: getCompanyForm(this.fb, mission.provider),
          paymentDetails: this.fb.group({
            penalties: [mission.paymentDetails.penalties],
            mode: [mission.paymentDetails.mode],
          }),
        });
      });
    }
  }

  get isConsultantFreelance() {
    return this.form.get("consultant.isFreelance").value as boolean;
  }

  async onSubmit() {
    const values = this.form.value;

    const consultant = {
      name: values.consultant.name,
      email: values.consultant.email,
      isFreelance: values.consultant.isFreelance,
      unitOfWorkPrice: values.consultant.unitOfWorkPrice,
      company: getCompanyFromForm(values.consultant.company),
    };

    const client = {
      ref: values.client.ref,
      email: values.client.email,
      company: getCompanyFromForm(values.client.company),
    };

    const paymentDetails = {
      mode: values.paymentDetails.mode,
      penalties: values.paymentDetails.penalties,
    };

    const mission = new Mission(
      null,
      this.store.auth.user.id,
      values.title,
      values.startDate,
      values.endDate,
      client,
      consultant,
      values.unitOfWorkType,
      values.unitOfWorkPrice,
      values.freelanceUnitOfWorkPrice,
      getCompanyFromForm(values.provider),
      paymentDetails
    );
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('mission')) {
      const id = urlParams.get('mission');
      await this.missions.updateMission(id, mission);
      this.router.navigate(["dashboard/mission/all"]);
      this.notificationService.push("Modification effectuée!", "success")
      return;
    }
    const res = await this.missions.createMission(mission);
    this.router.navigate(["dashboard/mission/all"]);
    this.notificationService.push("Mission créée!", "success")
  }
}
