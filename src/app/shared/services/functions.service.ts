import axios from "axios";

export class FunctionsService {
  protected async getFunction(
    functionName: string,
    params: Record<string, any>
  ) {
    return (
      await axios.get(`/.netlify/functions/${functionName}`, {
        params,
      })
    ).data;
  }

  protected async postFunction(
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
}
