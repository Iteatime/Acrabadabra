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
    add: 'saisir',
    edit: 'modifier',
    review: 'consulter'
  };
  mode: string;
  data: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serializer: SerializerService
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      if (params.hasOwnProperty('data')) {
        this.data = this.serializer.deserialize(params['data']);
      }
    });

    this.route.params.subscribe((params: Params) => {

      if (this.data !== undefined) {
        if (params['mode'] === this.modeMap.review && this.data.mode === 'review') {
          this.mode = this.data.mode;
        } else if (params['mode'] === this.modeMap.edit && this.data.mode === 'edit') {
          this.mode = this.data.mode;
        } else {
          this.router.navigate(['cra', 'saisir']);
        }
      } else if (params.hasOwnProperty(this.modeMap.add)) {
        this.mode = 'add';
      }
    });
  }
}
