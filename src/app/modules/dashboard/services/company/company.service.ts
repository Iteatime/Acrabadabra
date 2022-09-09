import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../../../environments/environment";
import { Company } from "../../../../shared/models";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  public company = new Company();

  private crud = async (
    method: string,
    id?: string,
    payload?: any
  ): Promise<any> => {
    try {
      if (typeof axios[method] === "undefined") {
        throw new Error(`Invalid REST method: '${method}'`);
      }
      const uri = `${environment.API_URl}/companies${id ? `/${id}` : ""}`;
      const response = await axios[method](uri, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  readCompanyByOwnerId = async (ownerId: string): Promise<Company> => {
    if (!ownerId) {
      throw new Error("Must specify an ID");
    }
    const result = await this.crud("get", ownerId);
    return result.length > 0 ? result[0] : null;
  };

  updateCompanyDetails = async (
    ownerId: string,
    company: Company
  ): Promise<Company> => {
    return this.crud("post", ownerId, company);
  };
}
