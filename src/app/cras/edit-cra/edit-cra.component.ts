import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SerializerService } from 'src/app/shared/serializer.service';
import { Cra } from 'src/app/shared/cra.model';

@Component({
  selector: 'app-edit-cra',
  templateUrl: './edit-cra.component.html',
  styleUrls: ['./edit-cra.component.scss']
})
export class EditCraComponent implements OnInit {


  cra = new Cra();

  rootUrl: string;
  craToken: string;
  saved = false;

  title: string[] = [
    'Créer',
    'Editer',
    'Vérifier'
  ];

  mode = 0;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private serializer: SerializerService
  ) {}

  ngOnInit() {

    const baseUrlArray: string[] = location.toString().split('/');
          baseUrlArray.pop();

    this.rootUrl = baseUrlArray.join('/');

    this.route.url.subscribe(
      (url: UrlSegment[]) => {
        switch (url[0].path) {
          case 'add':
            this.mode = 0;
            break;
          case 'edit':
            this.mode = 1;
            break;
          case 'review':
            this.mode = 2;
            break;
        }

      }
    );

    this.route.queryParams.subscribe(
      (parms: Params) => {
        if (parms.hasOwnProperty('cra') && this.mode !== 0) {
          this.cra = <Cra>this.serializer.deserialize(parms['cra']);
        } else if (this.mode === 0) {
          this.router.navigate(['cra', 'add']);
        } else {
          this.router.navigate(['']);
        }
      }
    );
  }

  /**
   * @description Generate the links to edit and review this cra
   *
   * @memberof EditCraComponent
   */
  onSubmitCRA() {
    const serialized = this.serializer.serialize(this.cra);
    this.craToken = serialized;
    this.saved = true;
  }
}
