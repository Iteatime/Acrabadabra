import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { SerializerService } from '../shared/serialization/serializer.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetComponent implements OnInit {

  modeMap = {
    add: 'create',
    edit: 'edit',
    review: 'review'
  };
  mode: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serializer: SerializerService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      if (params.hasOwnProperty('token')) {
        const token = this.serializer.deserialize(params['token']);
        if (params['mode'] === this.modeMap.review && token.mode === 'review') {
          this.mode = token.mode;
        } else if (params['mode'] === this.modeMap.edit && token.mode === 'edit') {
          this.mode = token.mode;
        } else {
          this.router.navigate(['timesheet', this.modeMap.add]);
        }
      } else if (params.hasOwnProperty(this.modeMap.add)) {
        this.mode = 'add';
      }
    });
  }
}
