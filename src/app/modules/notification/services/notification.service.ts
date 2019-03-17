import { Injectable } from '@angular/core';

export interface Notification {
  id: string;                   // auto generated unique id
  message: string;              // html content
  type: string;                 // 'default' | 'info' | 'warning' | 'success' => default: 'default'
  options: NotificationOptions; // options
}

export interface NotificationOptions {
  duration: number;             // delay in seconds before self closing => default: 5
  isDismissible: boolean;       // default: true
  isSelfClosing: boolean;       // default: true
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /** Notifications list */
  private notifications: Notification[] = [];

  /** Default notifiactions options */
  private options: NotificationOptions = {
    duration: 5,
    isDismissible: true,
    isSelfClosing: true
  };

  /** Id of the notifications container */
  private containerId = 'notifications';

  /** Id prefix of the nofications */
  private idPrefix = 'n-';

  /** Delay to wait before removing a notification on a dismiss action */
  private removingDelay = 1000;

  /** Classes for in and out animations */
  private animationClasses = {
    in: 'fade-in',
    out: 'fade-out'
  };

  constructor() { }

  /**
   * Get all active notifications
   */
  getNotifications(): Notification[] {
    return this.notifications;
  }

  /**
   * Get animation classes
   */
  getAnimationClasses(): any {
    return this.animationClasses;
  }

  /**
   * Get default options
   */
  getDefaultOptions(): NotificationOptions {
    return this.options;
  }

  /**
   * Add a notification
   */
  push(message: string, type: string = 'default', options = {}): void {
    const notification = {
      id: this.uniqueId(),
      message: message,
      type: type,
      options: this.getOptions(options)
    };

    this.notifications.push(notification);

    if (notification.options.isSelfClosing) {
      this.startTimer(notification);
    }
  }

  /**
   * Remove a notification
   */
  dismiss(notification: Notification): void {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      const elem = document.querySelector(`#${this.containerId} #${notification.id}`);
      if (elem) {
        elem.classList.add(this.animationClasses.out);
        setTimeout(() => {
          this.notifications.splice(index, 1);
        }, this.removingDelay);
      } else {
        this.notifications.splice(index, 1);
      }
    }
  }

  /**
   * Clear all notifications
   */
  dismissAll(): void {
    this.notifications.forEach((n) => {
      this.dismiss(n);
    });
  }

  /**
   * Merge default options with notification options
   */
  private getOptions(options = {}): NotificationOptions {
    const defaultOptions = this.getDefaultOptions();
    return Object.assign(defaultOptions, options);
  }

  /**
   * Generate a unique id for the notification
   */
  private uniqueId(): string {
    return this.idPrefix + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Start a timer for a self closing notification
   */
  private startTimer(notification: Notification): void {
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
