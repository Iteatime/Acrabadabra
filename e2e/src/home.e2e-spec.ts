import { HomePage } from './home.po';

import { browser, element, by, ElementFinder } from 'protractor';

describe('When browsing the HomePage :', () => {
  let home: HomePage;
  let buttonCreate: ElementFinder;

  beforeEach(() => {
    home = new HomePage();
    home.navigateTo();
    buttonCreate = element(by.buttonText('Saisir un CRA'));
  });

  it('the page title should be Acrabadabra', () => {
    expect(browser.getTitle()).toBe('Acrabadabra');
  });

  it('the baseline should be displayed', () => {
    expect(element(by.binding('Une solution en ligne pour les SSII'))).toBeDefined();
  });

  it('the "Saisir un CRA" button should be displayed', () => {
    expect(buttonCreate).not.toBeUndefined();
  });

  it('clicking on the button should route to the "Saisir un compte rendu d\'activité" page', () => {
    buttonCreate.click();
    expect(browser.getTitle()).toBe('Acrabadabra - Saisir un compte rendu d\'activité');
  });
});
