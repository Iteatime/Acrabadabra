import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionRoutingModule } from './mission.routes';
import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared/modules/shared-module/shared-module.module';
import { HttpClientModule } from '@angular/common/http';

import { MissionEditComponent } from './components/mission-edit/mission-edit.component';


@NgModule({
  declarations: [
    MissionEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule,
    HttpClientModule,
    MissionRoutingModule,
  ]
})
export class MissionModule { }
