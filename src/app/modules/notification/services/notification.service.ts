import { Injectable } from '@angular/core';

import { Notification } from '../@type/notification';
import { NotificationOptions } from '../@type/notification-options';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /** Notifications list */
  notifications: Notification[] = [];

  /** Default notifiactions options */
  options: NotificationOptions = {
    isDismissable: true,
    isSelfClosing: true,
    duration: 5
  };

  /** Id prefix of the nofications */
  idPrefix = 'notification-';

  /** Delay to wait before removing a notification on a dismiss action */
  removingDelay = 1000;

  constructor() { }

  /**
   * Add a notification
   */
  push(message: string, type: string = 'default', options = {}): void {
    const notification = {
      id: this.generateUniqueId(),
      message: message,
      type: type,
      options: this.mergeWithDefaultOptions(options)
    };

    this.notifications.push(notification);

    if (notification.options.isSelfClosing && notification.options.duration > 0) {
      this.startTimer(notification);
    }
  }

  /**
   * Remove a notification
   */
  dismiss(notification: Notification, delay: number = this.removingDelay): void {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      setTimeout(() => {
        this.notifications.splice(index, 1);
      }, delay);
    }
  }

  /**
   * Clear all notifications
   */
  dismissAll(): void {
    this.notifications.forEach(notification => {
      this.dismiss(notification, 0);
    });
  }

  /**
   * Merge default options with notification options
   */
  private mergeWithDefaultOptions(options = {}): any {
    return Object.assign({}, this.options, options);
  }

  /**
   * Generate a unique id for the notification
   */
  private generateUniqueId(): string {
    return this.idPrefix + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Start a timer for a self closing notification
   */
  startTimer(notification: Notification): void {
    let delay = notification.options.duration;
    const interval = setInterval(() => {
      if (delay > 0) {
        delay--;
      } else {
        clearInterval(interval);
        this.dismiss(notification);
      }
    }, 1000);
  }
}
