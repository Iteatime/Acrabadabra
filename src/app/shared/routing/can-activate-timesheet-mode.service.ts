import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { TimesheetTokenData } from '../../@types/timesheet-token-data';

import { SerializerService } from '../serialization/serializer.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateTimesheetModeService implements CanActivate {

  constructor(
    private router: Router,
    private serializer: SerializerService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {

    if (route.params.hasOwnProperty('token')) {
      try {
        const mode = this.serializer.deserialize(route.params['token']).mode;
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
