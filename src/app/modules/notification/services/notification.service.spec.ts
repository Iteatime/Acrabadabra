import { TestBed } from '@angular/core/testing';

import { NotificationService, Notification } from './notification.service';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

describe('NotificationService', () => {
  let service: NotificationService;
  beforeEach(() => {
    service = new NotificationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getNotifications()', () => {
    it('should return the notifications list', () => {
      expect(service.getNotifications()).toEqual([]);
    });
  });

  describe('getAnimationClasses()', () => {
    it('should return the animation classes', () => {
      expect(service.getAnimationClasses()).toEqual({
        in: 'fade-in',
        out: 'fade-out'
      });
    });
  });

  describe('push()', () => {
    it('should add a notification to the list with a unique id', () => {
      service.push('Hello world!');

      expect(service.getNotifications().length).toEqual(1);

      service.getNotifications().forEach((n) => {
        expect(n.id).toBeDefined();
      });
    });

    it('should merge notification options with default options', () => {
      service.push('Hello world!', 'default', { isSelfClosing: false, isDismissible: false });

      service.getNotifications().forEach((n) => {
        expect(n.options).toEqual({
          isSelfClosing: n.options.isSelfClosing,
          isDismissible: n.options.isDismissible,
          duration: service.getDefaultOptions().duration
        });
      });
    });

    it('should start a timer for a self closing notification', () => {
      service.push('Self closing notification', 'default', {
        isSelfClosing: true
      });
      service.getNotifications().forEach((n) => {
        expect(n.options.isSelfClosing).toEqual(true);
      });
    });
  });

  describe('dismiss()', () => {
    it('should remove the notification', () => {
      service.push('Hello world!');
      service.getNotifications().forEach((n) => {
        service.dismiss(n);
      });
      expect(service.getNotifications().length).toEqual(0);
    });
  });
});
