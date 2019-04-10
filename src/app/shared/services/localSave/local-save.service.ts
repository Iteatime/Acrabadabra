import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSaveService {
  constructor() {}

  /**
   * Saving item into localStorage
   *
   * @param {string} name
   * @param {any} item
   */
  public setLocalItem(name: string, item: any) {
    const serialized = this.serializeObject(item);
    localStorage.setItem(name, serialized);
  }

  /**
  * Getting item from localStorage
  *
  * @returns {any}
  */
  public getLocalItem(name: string): any {
    return this.deserializeObject(localStorage.getItem(name));
  }

  /**
   * Private method to serialize an object
   *
   * @param {any} o
   * @returns {string}
   */
  private serializeObject(o: any): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(o))));
  }

  /**
   * Private method to deserialize a localStorage item
   *
   * @param {string} serialized
   * @returns {any}
   */
  private deserializeObject(serialized: string): any {
    if (typeof serialized !== 'string') {
      return;
    }
    return JSON.parse(decodeURIComponent(escape(atob(serialized))));
  }
}
