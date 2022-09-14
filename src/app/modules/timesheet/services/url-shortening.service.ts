import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UrlShorteningService {
  constructor(private _http: HttpClient) {}

  public shortenUrl(url): Promise<string> {
    const headers = new HttpHeaders({
      apikey: "",
      "Content-Type": "application/json",
      workspace: "",
    });

    const body = JSON.stringify({
      destination: url,
      domain: { fullName: "link.acrabadabra.com" },
    });

    return this._http
      .post<any>("", body, { headers })
      .toPromise()
      .then((res) => {
        return res.shortUrl;
      })
      .catch((error) => {
        console.error(error);
        return url;
      });
  }
}
