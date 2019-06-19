import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule],
  exports: [NotificationsComponent],
})
export class NotificationModule {}
