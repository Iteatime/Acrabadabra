import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';

import { SerializerService } from 'src/app/shared/serialization/serializer.service';
import { Cra } from 'src/app/shared/cra.model';

@Component({
  selector: 'app-edit-cra',
  templateUrl: './edit-cra.component.html',
  styleUrls: ['./edit-cra.component.scss']
})
export class EditCraComponent implements OnInit {

  cra = new Cra();
  editToken: string;
  reviewToken: string;

  saved = false;
  showModal = false;

  title = {
    add: 'Créer',
    edit: 'Editer',
    review: 'Consulter',
  };

  mode: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serializer: SerializerService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(
      (parms: Params) => {
        if (parms.hasOwnProperty('data')) {
          const datas = <{mode: string, cra: Cra}>this.serializer.deserialize(parms['data']);
          this.mode = datas.mode;
          this.cra = <Cra>datas.cra;
        } else {
          this.mode = 'add';
        }
      }
    );
  }

  /**
   * @description Generate the links token to edit and review this cra
   *
   * @memberof EditCraComponent
   */
  onSubmitCRA() {

    const editData = {
      mode: 'edit',
      cra: this.cra,
    };
    const reviewData = {
      mode: 'review',
      cra: this.cra,
    };

    this.saved = true;
    this.showModal = true;

    this.editToken = this.serializer.serialize(editData);
    this.reviewToken = this.serializer.serialize(reviewData);
  }

  /**
   * @description Called when the modal close
   *
   * @memberof EditCraComponent
   */
  onModalClose() {

    this.showModal = false;
    setTimeout(
      () => {
        this.saved = false;
      },
      2000
    );
  }
}
