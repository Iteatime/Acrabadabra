import { AddPage } from './add.po';

import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';


describe('When browsing the AddPage', () => {
  let editPage: AddPage;

  beforeEach(() => {
    editPage = new AddPage();
    editPage.navigateTo();
    browser.waitForAngular();
  });

  it('the page title should be set to "Acrabadabra -  Saisir un compte rendu d\'activité"', () => {
    expect(browser.getTitle()).toBe('Acrabadabra - Saisir un compte rendu d\'activité');
  });

  it('the heading should be displayed', () => {
    const heading = element(by.cssContainingText('h2', 'un compte rendu d\'activité'));
    expect(heading).not.toBeUndefined();
  });

  describe('and editing the cra', () => {
    let day: ElementFinder,
        dayBadge: ElementFinder,
        dayBadgeSelectors: ElementArrayFinder;


    beforeEach(() => {
      day = editPage.getDayCells(4).get(0);
      dayBadge = editPage.getADayBadge(day);
      dayBadgeSelectors = day.element(by.xpath('..')).all(by.css('.cal-day-badge-selector'));
      day.click();

      // Used when debuging to see the selected day
      /*
      browser.actions()
          .mouseMove(editPage.getSubmitButton())
          .perform();
      */
    });

    it('picking a day should selecte it', () => {
      expect(editPage.getADayBadge(day).getText()).toBe('1\njour');
    });

    it('clicking on the "Sélectionner les jours ouvrés" button should select all business day', () => {
        const selectAllBusinessDayButton = element(
                by.cssContainingText('.calendar__content__tools__selectall', 'Sélectionner les jours ouvrés')
              ),
              selectedNumber = element(by.className('highlight'));

      selectAllBusinessDayButton.click();
      expect(selectedNumber.getText()).toBe('23');
    });

    describe('to change a day length', () => {
      beforeEach(() => {
      browser.actions()
        .mouseMove(dayBadge)
        .perform();
      });

      it('if 0 clicked it should unselect the day', () => {
        browser.actions()
            .click(dayBadgeSelectors.get(0))
            // Used to prevent the element to be kept because of the moseover
            .mouseMove(day)
            .perform();
        expect(editPage.getADayBadge(day).isPresent()).toBeFalsy();
      });

      it('if 0,5 clicked it should set it\'s value', () => {
        browser.actions()
            .click(dayBadgeSelectors.get(1))
            .perform();

        // Sleeping to wait for the annimation end
        browser.sleep(50);

        // Moving the mouse away to read the value
        browser.actions()
            .mouseMove(day)
            .perform();

        // Sleeping to wait for the annimation end
        browser.sleep(170);

        expect(editPage.getADayBadge(day).getText()).toBe('0,5\njour');
      });

    });
  });

  describe('and sending the form', () => {

    describe('if it is valid', () => {
      it('an error modalshould be shown', () => {
        const modal = element(by.cssContainingText('.modal-title', 'Validation impossible'));

        editPage.getSubmitButton().click();
        expect(modal.isDisplayed()).toBeTruthy();
      });

      it('validation messages sould be shown', () => {
        const validationMessages = element.all(by.className('alert')),
              modalClose = element(by.css('.modal.open'));

        editPage.getSubmitButton().click();
        modalClose.click();
        expect(validationMessages.count()).toBe(4);
      });
    });

    describe('if it is valid', () => {
      it('a successful modal should be shown', () => {
        const formInputs = element.all(by.tagName('input')),
              modal = element(by.cssContainingText('.modal-title', 'Votre CRA a bien été créé'));

        formInputs.get(0).sendKeys('Clément PONT');
        formInputs.get(1).sendKeys('clement.pont@mrclemds.fr');
        formInputs.get(2).sendKeys('Dev FullStack Junior');
        formInputs.get(3).sendKeys('Iteatime');
        editPage.getSubmitButton().click();

        expect(modal.isDisplayed()).toBeTruthy();
      });
    });
  });
});
