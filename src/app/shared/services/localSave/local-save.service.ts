import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSaveService {
  constructor() { }

  /**
   * Saving CRA infos into localStorage
   *
   * @param {string} token
   */
  static setCRAInfos(token: string) {
    localStorage.setItem('CRAInfos', token);
  }

  /**
  * Getting CRA infos from localStorage
  *
  * @returns {string}
  */
  static getCRAInfos(): string {
    return localStorage.getItem('CRAInfos');
  }

  /**
  * Check if there is existing informations into LocalStorage
  *
  * @returns {boolean}
  */
  static checkCRAInfos(): boolean {
    return localStorage.getItem('CRAInfos') !== null;
  }

  /**
  * Empty CRA infos into localStorage
  *
  */
  static deauthenticateUser(): void {
    localStorage.removeItem('CRAInfos');
  }
}
