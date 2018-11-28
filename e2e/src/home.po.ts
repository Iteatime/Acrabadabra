import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getBaseline() {
    return element(by.binding('Une solution en ligne pour les SSII'));
  }

  getCreateCraButton() {
    return element(by.buttonText('Saisir un CRA'));
  }
}
