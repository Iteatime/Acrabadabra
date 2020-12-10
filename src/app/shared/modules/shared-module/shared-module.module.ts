import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { RouterModule } from '@angular/router';
import { CopyToClipboardDirective } from '@directives/copy-to-clipboard/copy-to-clipboard.directive';
import { MissionListComponent } from 'src/app/modules/mission/components/mission-list/mission-list.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [HeaderComponent, MissionListComponent, CopyToClipboardDirective],
  imports: [CommonModule, RouterModule, [SweetAlert2Module.forRoot()]],
  exports: [HeaderComponent, MissionListComponent, CopyToClipboardDirective],
})
export class SharedModuleModule {}
