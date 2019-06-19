import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';

describe('CopyToClipboardDirective', () => {
  let notificationService: NotificationService;

  it('should create an instance', () => {
    notificationService = new NotificationService();
    const directive = new CopyToClipboardDirective(notificationService);
    expect(directive).toBeTruthy();
  });
});
