import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bill',
  template: '<iframe style="width:100%; height:100vh;" [src]="contentUrl"></iframe>',
})
export class BillComponent implements OnInit {

  contentUrl: any;

  constructor(
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.hasOwnProperty('token')) {
          this.contentUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/F201707-15.pdf?data=' + params.token);
        }
      }
    );
  }

}
