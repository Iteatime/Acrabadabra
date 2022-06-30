import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense.routes';
import { ExpenseMileageFormComponent } from './components/expense-mileage-form/expense-mileage-form.component';
import { ExpenseMileageTableComponent } from './components/expense-mileage-table/expense-mileage-table.component';
import { ExpenseMiscellaneousFormComponent } from './components/expense-miscellaneous-form/expense-miscellaneous-form.component';
import { ExpenseMiscellaneousTableComponent } from './components/expense-miscellaneous-table/expense-miscellaneous-table.component';
import { ExpenseFlatFeeFormComponent } from './components/expense-flat-fee-form/expense-flat-fee-form.component';
import { ExpenseFlatFeeTableComponent } from './components/expense-flat-fee-table/expense-flat-fee-table.component';
import { FormsModule } from '@angular/forms';

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
