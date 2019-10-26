import { Component } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  templateUrl: './card-skeleton.component.html',
  styles: [
    '.skeleton-title { height: 12px; }',
    '.skeleton-content { height: 24px; }'
  ]
})
export class ActivityCardSkeletonComponent {
  constructor() { }
}
