import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSaveService {
  constructor() { }

  /**
   * Saving item into localStorage
   *
   * @param {string} name
   * @param {any} item
   */
  static setLocalItem(name: string, item: any) {
    localStorage.setItem(name, item);
  }

  /**
  * Getting item from localStorage
  *
  * @returns {string}
  */
  static getLocalItem(name: string): string {
    return localStorage.getItem(name);
  }

  /**
  * Check if item named is into LocalStorage
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
}
