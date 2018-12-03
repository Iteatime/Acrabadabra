import { EditCraPage } from './editCra.po';

import { browser, by, ElementFinder } from 'protractor';

describe('When I input my timesheet', () => {
  let editCraPage: EditCraPage,
      nameInput: ElementFinder,
      emailInput: ElementFinder,
      titleInput: ElementFinder,
      clientInput: ElementFinder;

  beforeEach(() => {
    editCraPage = new EditCraPage();
    editCraPage.navigateTo();
    browser.waitForAngular();

    nameInput = editCraPage.getInputByLabelText('Nom');
    emailInput = editCraPage.getInputByLabelText('Email');
    titleInput = editCraPage.getInputByLabelText('Intitulé');
    clientInput = editCraPage.getInputByLabelText('Client final');
  });

  it('should be possible to enter my name', () => {
    nameInput.sendKeys('Tester');
    expect(nameInput.getAttribute('value')).toBe('Tester');
  });

  it('should be possible to enter my email', () => {
    emailInput.sendKeys('tester@test.com');
    expect(emailInput.getAttribute('value')).toBe('tester@test.com');
  });

  it('should be possible to enter a mission title', () => {
    titleInput.sendKeys('Testing');
    expect(titleInput.getAttribute('value')).toBe('Testing');
  });

  it('should be possible to enter the client\'s name', () => {
    clientInput.sendKeys('Test.com');
    expect(clientInput.getAttribute('value')).toBe('Test.com');
  });

  describe('On the calendar', () => {
    let selectedNumber: ElementFinder,
        aDayCell: ElementFinder;

    beforeEach(() => {
      aDayCell = editCraPage.getElementsByText('4').first();
      aDayCell.click();
      selectedNumber = editCraPage.getElementsByText('Nombre total de journées :')
              .first()
              .element(by.xpath('..//span[@class="highlight"]'));
    });

    it('should be possible to select days', () => {
      expect(editCraPage.getADayBadge(aDayCell).getText()).toBe('1\njour');
    });

    it('It should be possible to select every working day', () => {
      editCraPage.getElementsByText('Sélectionner les jours ouvrés').first().click();

      expect(selectedNumber.getText()).toBe('21');
    });

    describe('', () => {
      let dayBadge: ElementFinder;

      beforeEach(() => {
        dayBadge = editCraPage.getADayBadge(aDayCell);

        browser.actions()
            .mouseMove(dayBadge)
            .perform();

        // Sleeping to wait for the annimation end
        browser.sleep(50);

        browser.actions()
            .click(editCraPage.getElementsByText('0,5').first())
            .perform();

        // Sleeping to wait for the annimation end
        browser.sleep(50);

        // Moving the mouse away to read the value
        browser.actions()
            .mouseMove(aDayCell)
            .perform();

        // Sleeping to wait for the annimation end
        browser.sleep(170);
      });

      it('should be possible to change the duration of a day', () => {
        expect(dayBadge.getText()).toBe('0,5\njour');
      });

      it('should show the total number of days', () => {
        editCraPage.getElementsByText('10').first().click();
        expect(selectedNumber.getText()).toBe('1,5');
      });
    });
  });

  describe('When I validate my inputs', () => {
    let submitButton: ElementFinder;

    beforeEach(() => {
      submitButton = editCraPage.getSubmitButton();
    });

    describe('If something is wrong', () => {
      beforeEach(() => {
        submitButton.click();
      });

      it('It should tell me via a modal', () => {
        expect(editCraPage.getElementsByText('Validation impossible').count()).toBe(1);
      });

      it('It should tell me my mistakes via validation messages', () => {
        expect(editCraPage.getElementsByText('Ce champ est obligatoire').count()).toBe(4);
      });
    });

    describe('If everything is good', () => {
      beforeEach(() => {
        nameInput.sendKeys('Tester');
        emailInput.sendKeys('tester@test.com');
        titleInput.sendKeys('Testing');
        clientInput.sendKeys('Test.com');
        submitButton.click();
      });

      it('should open a modal', () => {
        expect(editCraPage.getElementsByText('Votre CRA a bien été créé').count()).toBe(1);
      });

      it('It should give me two links', () => {
        expect(editCraPage.getElementsByText('ce lien').count()).toBe(2);
      });
    });
  });
});
