import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
export class EditCraPage {

  navigateTo() {
    return browser.get('/cra/edit');
  }

  getElementsByText(text: string): ElementArrayFinder {
    return element.all(by.xpath('//div[@class="edit-cra"]//*[contains(text(),"' + text + '")]'));
  }

  getInputByLabelText(text: string): ElementFinder {
    const label = this.getElementsByText(text).first();
    return label.element(by.xpath('..//input'));
  }

  getSubmitButton(): ElementFinder {
    return element(by.buttonText('Valider mon CRA'));
  }

  getADayBadge(dayElement: ElementFinder): ElementFinder {
    return dayElement.element(by.xpath('..//span[@class="calendar__content__dayselect__dayitem__cell__changer__maintext"]'));
  }
}
