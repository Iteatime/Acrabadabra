import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ExpenseFlatFeeFormComponent } from './components/expense-flat-fee-form/expense-flat-fee-form.component';
import { ExpenseFlatFeeTableComponent } from './components/expense-flat-fee-table/expense-flat-fee-table.component';
import { ExpenseMileageFormComponent } from './components/expense-mileage-form/expense-mileage-form.component';
import { ExpenseMileageTableComponent } from './components/expense-mileage-table/expense-mileage-table.component';
import { ExpenseMiscellaneousFormComponent } from './components/expense-miscellaneous-form/expense-miscellaneous-form.component';
import { ExpenseMiscellaneousTableComponent } from './components/expense-miscellaneous-table/expense-miscellaneous-table.component';
import { ExpenseRoutingModule } from './expense.routes';

@NgModule({
  declarations: [
    ExpenseMileageFormComponent,
    ExpenseMileageTableComponent,
    ExpenseMiscellaneousFormComponent,
    ExpenseMiscellaneousTableComponent,
    ExpenseFlatFeeFormComponent,
    ExpenseFlatFeeTableComponent,
  ],
  imports: [CommonModule, ExpenseRoutingModule, FormsModule],
  exports: [
    CommonModule,
    ExpenseMileageFormComponent,
    ExpenseMileageTableComponent,
    ExpenseMiscellaneousFormComponent,
    ExpenseMiscellaneousTableComponent,
    ExpenseFlatFeeFormComponent,
    ExpenseFlatFeeTableComponent,
  ],
})
export class ExpenseModule {}
