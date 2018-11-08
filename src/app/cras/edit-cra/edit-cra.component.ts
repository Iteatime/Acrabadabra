import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';

import { SerializerService } from 'src/app/shared/serialization/serializer.service';
import { Cra } from 'src/app/shared/cra.model';
import { formData } from 'src/app/@types/formData';

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
    public route: ActivatedRoute,
    private serializer: SerializerService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.hasOwnProperty('data')) {
          const datas: formData = this.serializer.deserialize(params['data']);
          this.mode = datas.mode;
          this.cra = datas.cra;
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

    const data: formData = {
      mode: 'edit',
      cra: this.cra,
    };

    this.saved = true;
    this.showModal = true;

    this.editToken = this.serializer.serialize(data);

    data.mode = 'review',

    this.reviewToken = this.serializer.serialize(data);
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
