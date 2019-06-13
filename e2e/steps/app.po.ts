import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo = () => browser.get('/');

  getTitle = () => {
    browser.waitForAngularEnabled(false);
    return element(by.css('app-root h1'));
  };

  getParagraphText = () => this.getTitle().getText();
}
