import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlShorteningService {

  constructor (private readonly _http: HttpClient) { }

  shortenUrl (url): Promise<string> {
    const headers = new HttpHeaders({
      'apikey': environment.short_url_api_key,
      'Content-Type': 'application/json',
      'workspace': environment.short_url_workspace
    });

    const body =  JSON.stringify({
      destination: url,
      domain: { fullName: 'link.acrabadabra.com' }
    });

    return this._http.post<any>(environment.short_url_api, body, { headers }).toPromise()
      .then((res) => {
        return res.shortUrl;
      })
      .catch((error) => {
        console.error(error);
        return url;
      });
  }
}
