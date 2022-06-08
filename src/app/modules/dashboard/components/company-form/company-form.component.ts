import { Component, OnInit } from "@angular/core";
import { Company } from "../../../../shared/models";

@Component({
  selector: "app-company-form",
  templateUrl: "./company-form.component.html",
})
export class CompanyFormComponent implements OnInit {
  company: Company;

  constructor() {}

  ngOnInit() {}
}
