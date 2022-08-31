import { Injectable } from "@angular/core";
import axios from "axios";

import { Company } from "../../models";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  public company = new Company();

  private async getFunction(functionName: string, params: Record<string, any>) {
    return (
      await axios.get(`/.netlify/functions/${functionName}`, {
        params,
      })
    ).data;
  }

  private async postFunction(
    functionName: string,
    params: Record<string, any>,
    body: any
  ) {
    return (
      await axios.post(`/.netlify/functions/${functionName}`, body, {
        params,
      })
    ).data;
  }

  readCompanyByOwnerId = async (ownerId: string): Promise<Company> => {
    if (!ownerId) {
      throw new Error("Must specify an ID");
    }
    const result = await this.getFunction("readCompanyByOwnerId", {
      id: ownerId,
    });
    return result.length > 0 ? result[0] : null;
  };

  updateCompanyDetails = async (
    ownerId: string,
    company: Company
  ): Promise<Company> => {
    const result = await this.postFunction(
      "updateCompanyDetails",
      {
        id: ownerId,
      },
      company
    );
    return result;
  };
}
