import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SerializationService {
  constructor() {}

  public serializeObject(o: any): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(o))));
  }

  public deserializeObject(serialized: string): any {
    if (serialized) {
      try {
        return JSON.parse(decodeURIComponent(escape(atob(serialized))));
      } catch {
        alert('Données invalides');
        return false;
      }
    }
    return false;
  }
}
