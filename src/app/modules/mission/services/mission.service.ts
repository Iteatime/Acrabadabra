import { Injectable } from '@angular/core';
import { Mission } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  public mission = new Mission();


  constructor() { }

  createTodo(data) {
    return fetch('/.netlify/functions/todos-create', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json();
    });
  }

}

