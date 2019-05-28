import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routes';
import { SharedModuleModule } from 'src/app/shared/modules/shared-module/shared-module.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModuleModule
  ]
})
export class DashboardModule { }
