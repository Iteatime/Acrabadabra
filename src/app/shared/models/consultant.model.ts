import { Company } from "./company.model";

export class Consultant {
  email: string;
  name: string;
  company: Company;

  constructor(consultantEmail: string, consultantName: string) {
    this.email = consultantEmail;
    this.name = consultantName;
    this.company = new Company();
  }
}
