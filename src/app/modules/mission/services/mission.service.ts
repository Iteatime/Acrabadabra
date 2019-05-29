import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mission } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class MissionService {


  baseUrl = 'http://localhost:3000/api/mission';
  public mission = new Mission();

  constructor(private httpClient: HttpClient) { }

  // createMission(mission: Mission) {
  //   return this.httpClient.post<Mission>(this.baseUrl, mission);
  // }
  createTodo(data) {
    console.log(data);
    return fetch('/.netlify/functions/todos-create', {
      // headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json();
    });
  }

  readAll = () => {
    return fetch('/.netlify/functions/todos-read-all').then((response) => {
      return response.json();
    });
  }


}

