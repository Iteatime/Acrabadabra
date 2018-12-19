import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

import { Base64 } from 'js-base64';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService implements CanActivate {

  constructor(private router: Router) { }

  tokenize(serializableContent: any): string {
    return Base64.encode(JSON.stringify(serializableContent));
  }

  deTokenize(serializedContent: string): any {

    const decodedValue: string = Base64.decode(serializedContent);
    const deserializedContent: any = JSON.parse(decodedValue);

    return deserializedContent;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {

    if (route.params.hasOwnProperty('token')) {
      try {
        const mode = this.deTokenize(route.params['token']).mode;
        if (route.url[1].path === mode) {
          return true;
        } else {
          this.router.navigate(['timesheet', mode, route.params['token']]);
          return false;
        }
      } catch (e) {
        this.router.navigate(['timesheet', 'create']);
        console.log('Invalid token');
      }

    } else if (route.url[1].path === 'create') {
      return true;
    }
  }
}
