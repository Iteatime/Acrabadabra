import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { RouterModule } from '@angular/router';
import { CopyToClipboardDirective } from '../../directives/copy-to-clipboard/copy-to-clipboard.directive';
import { MissionListComponent } from 'src/app/modules/mission/components/mission-list/mission-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MissionListComponent,
    CopyToClipboardDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    MissionListComponent,
    CopyToClipboardDirective
  ]
})
export class SharedModuleModule { }
