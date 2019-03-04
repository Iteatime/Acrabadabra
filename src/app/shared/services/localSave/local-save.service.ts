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
  static setLocalItem(name: string, item: any) {
    const serialized = this.serializeObject(item);
    localStorage.setItem(name, serialized);
  }

  /**
  * Getting item from localStorage
  *
  * @returns {any}
  */
  static getLocalItem(name: string): any {
    return this.deserializeObject(localStorage.getItem(name));
  }

  /**
  * Check if item named is into localStorage
  *
  * @returns {boolean}
  */
  static checkItemExists(name: string): boolean {
    return localStorage.getItem(name) !== null;
  }

  /**
  * Remove item from localStorage
  *
  */
  static removeLocalItem(name: string): void {
    localStorage.removeItem(name);
  }

  /**
   * Private method to check if type of the serializable
   *
   * @param {any} o
   * @returns {boolean}
   */
  private static isSerializableObject(o: any): boolean {
    if (typeof o !== 'object') {
      return false;
    }
    return true;
  }

  /**
   * Private method to serialize an object
   *
   * @param {any} o
   * @returns {string}
   */
  private static serializeObject(o: any): string {
    if (!this.isSerializableObject(o)) {
      return '';
    }
    return btoa(unescape(encodeURIComponent(JSON.stringify(o))));
  }

  /**
   * Private method to deserialize a localStorage item
   *
   * @param {string} serialized
   * @returns {any}
   */
  private static deserializeObject(serialized: string): any {
    if (typeof serialized !== 'string') {
      return;
    }
    return JSON.parse(decodeURIComponent(escape(atob(serialized))));
  }
}
