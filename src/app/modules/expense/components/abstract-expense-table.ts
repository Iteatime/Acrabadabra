import { EventEmitter, Input, Output } from '@angular/core';
import { MonetaryService } from '../../../shared/services/monetary/monetary.service';

export abstract class AbstractExpenseTable {
  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Input() hideDeleteButton = false;

  local = 'fr';
  currencyCode: string;

  protected constructor(readonly _monetaryService: MonetaryService) {
    this.currencyCode = this._monetaryService.currencyCode;
  }
}
