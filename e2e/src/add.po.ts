import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class AddPage {
  navigateTo() {
    return browser.get('/cra/edit');
  }

  getSubmitButton(): ElementFinder {
    return element(by.buttonText('Valider mon CRA'));
  }

  getDayCells(date: number): ElementArrayFinder  {
    return element.all(by.cssContainingText('.cal-day-number', date.toString()));
  }

  getADayBadge(dayElement: ElementFinder): ElementFinder {
    return dayElement.element(by.xpath('..')).element(by.css('.calendar__content__dayselect__dayitem__cell__changer__maintext'));
  }
}
