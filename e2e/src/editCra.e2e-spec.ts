import { EditCraPage } from './editCra.po';

import { browser, by, ElementFinder } from 'protractor';
import { getDate, getDay, lastDayOfMonth, setDate, startOfMonth } from 'date-fns';
import { link } from 'fs';

describe('When I input my timesheet', () => {
  let editCraPage: EditCraPage,
      nameInput: ElementFinder,
      emailInput: ElementFinder,
      titleInput: ElementFinder,
      clientInput: ElementFinder,
      selectedNumber: ElementFinder;

  const getBusinessDaysNumber = function(): number {
    let workingDays = 0;
    const date = startOfMonth(new Date());

    for (let day = 1; day <= getDate(lastDayOfMonth(date)); day++) {
      const weekDay = getDay(setDate(date, day));
      workingDays += (weekDay === 0 || weekDay === 6) ? 0 : 1;
    }

    return workingDays;
  };

  beforeEach(() => {
    editCraPage = new EditCraPage();
    editCraPage.navigateTo();
    browser.waitForAngular();

    nameInput = editCraPage.getInputByLabelText('Nom');
    emailInput = editCraPage.getInputByLabelText('Email');
    titleInput = editCraPage.getInputByLabelText('Intitulé');
    clientInput = editCraPage.getInputByLabelText('Client final');

    selectedNumber = editCraPage.getElementsByText('Nombre total de journées :')
            .first()
            .element(by.xpath('..//span[@class="highlight"]'));
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
    let aDayCell: ElementFinder;

    beforeEach(() => {
      aDayCell = editCraPage.getElementsByText('4').first();
      aDayCell.click();
    });

    it('should be possible to select days', () => {
      expect(editCraPage.getADayBadge(aDayCell).getText()).toBe('1\njour');
    });

    it('should be possible to select every working day', () => {
      editCraPage.getElementsByText('Sélectionner les jours ouvrés').first().click();
      expect(selectedNumber.getText()).toBe(getBusinessDaysNumber().toString());
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

      it('should tell me via a modal', () => {
        expect(editCraPage.getElementsByText('Validation impossible').count()).toBe(1);
      });

      it('should tell me my mistakes via validation messages', () => {
        expect(editCraPage.getElementsByText('Ce champ est obligatoire').count()).toBe(4);
      });
    });

    describe('If everything is good', () => {
      beforeEach(() => {
        nameInput.sendKeys('Tester');
        emailInput.sendKeys('tester@test.com');
        titleInput.sendKeys('Testing');
        clientInput.sendKeys('Test.com');
        editCraPage.getElementsByText('Sélectionner les jours ouvrés').first().click();
        submitButton.click();
      });

      it('should open a modal', () => {
        expect(editCraPage.getElementsByText('Votre CRA a bien été créé').count()).toBe(1);
      });

      it('should give me two links', () => {
        expect(editCraPage.getElementsByText('ce lien').count()).toBe(2);
      });

      describe('When I click on one of these links', () => {

        it('should get data from the link', () => {
          editCraPage.getElementsByText('ce lien').get(0).getAttribute('href').then((value: string) => {
            browser.get(value);
            expect(nameInput.getAttribute('value')).toBe('Tester');
            expect(emailInput.getAttribute('value')).toBe('tester@test.com');
            expect(titleInput.getAttribute('value')).toBe('Testing');
            expect(clientInput.getAttribute('value')).toBe('Test.com');
            expect(selectedNumber.getText()).toBe(getBusinessDaysNumber().toString());
          });
        });

        it('should be the edit link if it was the first one', () => {
          editCraPage.getElementsByText('ce lien').get(0).getAttribute('href').then((value: string) => {
            browser.get(value);
            expect(browser.getTitle()).toBe('Acrabadabra - Editer un compte rendu d\'activité');
          });
        });

        it('should be the review link if it was the second one', () => {
          editCraPage.getElementsByText('ce lien').get(1).getAttribute('href').then((value: string) => {
            browser.get(value);
            expect(browser.getTitle()).toBe('Acrabadabra - Consulter un compte rendu d\'activité');
          });
        });
      });
    });
  });
});
