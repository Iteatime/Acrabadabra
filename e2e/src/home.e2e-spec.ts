import { HomePage } from './home.po';

import { browser } from 'protractor';

describe('When browsing the HomePage :', () => {
  let home: HomePage;

  beforeEach(() => {
    home = new HomePage();
    home.navigateTo();
  });

  it('the page title should be Acrabadabra', () => {
    expect(browser.getTitle()).toBe('Acrabadabra');
  });

  it('the baseline should be displayed', () => {
    expect(home.getBaseline()).not.toBeUndefined();
  });

  it('the "Saisir un CRA" button should be displayed', () => {
    expect(home.getCreateCraButton()).not.toBeUndefined();
  });

  it('clicking on the button should route to the "Saisir un compte rendu d\'activité" page', () => {
    home.getCreateCraButton().click();
    expect(browser.getTitle()).toBe('Acrabadabra - Saisir un compte rendu d\'activité');
  });
});
