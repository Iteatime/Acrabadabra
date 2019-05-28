import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionEditComponent } from './components/mission-edit/mission-edit.component';
import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared/modules/shared-module/shared-module.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MissionEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule,
    HttpClientModule,
  ]
})
export class MissionModule { }
