import { Component, ViewEncapsulation } from '@angular/core';

import { Notification } from '../../@type/notification';
import { NotificationService } from '../../services/notification.service';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent {
	notifications: Notification[] = this.notificationService.notifications;

	constructor(private notificationService: NotificationService) {}

	dismiss(notification: Notification): void {
		const elem = document.querySelector(`#notifications #${notification.id}`);
		if (elem) {
			elem.classList.add('fade-out');
		}
		this.notificationService.dismiss(notification);
	}
}
