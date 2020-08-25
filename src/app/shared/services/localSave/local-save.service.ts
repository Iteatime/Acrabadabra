import { Injectable } from '@angular/core';
import { SerializationService } from '../serialization/serialization.service';

@Injectable({
  providedIn: 'root'
})
export class LocalSaveService {
  constructor (private readonly _serializer: SerializationService) {}

  /**
   * Saving item into localStorage
   *
   * @param {string} name
   * @param {any} item
   */
  setLocalItem (name: string, item: any) {
    const serialized = this._serializer.serializeObject(item);
    localStorage.setItem(name, serialized);
  }

  /**
  * Getting item from localStorage
  *
  * @returns {any}
  */
  getLocalItem (name: string): any {
    return this._serializer.deserializeObject(localStorage.getItem(name));
  }

}
