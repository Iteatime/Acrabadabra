import { NotificationOptions } from './notification-options';

export interface Notification {
  id: string; // auto generated unique id
  message: string; // html content
  type: string; // 'default' | 'info' | 'warning' | 'success' => default: 'default'
  options: NotificationOptions; // options
}
