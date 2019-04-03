import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  public constructor(
    public auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    if (this.route.snapshot.firstChild === null) {
      this.router.navigate(['create'], { relativeTo: this.route });
    }
  }

  public onProviderBtnClick() {
    this.auth.widget.open();
  }
}
