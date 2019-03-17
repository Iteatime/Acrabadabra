import { Component } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  notifications: Notification[] = this.notificationService.getNotifications();
  animationInClass = this.notificationService.getAnimationClasses().in;

  constructor(private notificationService: NotificationService) { }

  dismiss(notification: Notification): void {
    if (notification.options.isDismissible) {
      this.notificationService.dismiss(notification);
    }
  }

}
