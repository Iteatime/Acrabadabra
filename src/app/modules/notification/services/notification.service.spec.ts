import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('push()', () => {
    it('should add a notification to the list with an id', () => {
      service.push('I\'m a simple notification');

      expect(service.notifications.length).toEqual(1);

      service.notifications.forEach((notification) => {
        expect(notification.id).toBeDefined();
      });
    });

    it('should merge notification options with default options', () => {
      service.push('I\'m a notification with custom options', 'default', { isSelfClosing: false, isDismissable: false });

      service.notifications.forEach((n) => {
        expect(n.options).toEqual({
          isSelfClosing: n.options.isSelfClosing,
          isDismissable: n.options.isDismissable,
          duration: service.options.duration
        });
      });
    });

    it('should launch a timer for selfclosing notifications only and remove it after the delay', () => {
      spyOn(service, 'startTimer');

      service.push('I\'m NOT a selfclosing notification', 'default', { isSelfClosing: false });
      expect(service.startTimer).not.toHaveBeenCalled();

      service.push('I\'m a selfclosing notification', 'default', { isSelfClosing: true, duration: 3 });
      expect(service.startTimer).toHaveBeenCalled();

      setTimeout(() => {
        expect(service.notifications.length).toEqual(1);
        expect(service.notifications[0].message).toEqual('I\'m a selfclosing notification');
      }, service.removingDelay + 3000);
    });
  });

  describe('dismiss()', () => {
    it('should remove the notification', () => {
      service.push('First');
      service.push('Second');
      service.push('Third');

      service.dismiss(service.notifications[1]);

      setTimeout(() => {
        expect(service.notifications.length).toEqual(2);
        expect(service.notifications[0].message).toEqual('First');
        expect(service.notifications[1].message).toEqual('Third');
      }, service.removingDelay);
    });
  });

  describe('dismissAll()', () => {
    it('should remove all notifications', () => {
      service.push('First');
      service.push('Second');
      service.push('Third');

      service.dismissAll();
      setTimeout(() => {
        expect(service.notifications.length).toEqual(0);
      }, 100);
    });
  });
});
