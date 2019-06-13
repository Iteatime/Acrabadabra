import { Given, Before, When, Then } from 'cucumber';
import { browser, element, by, ExpectedConditions } from 'protractor';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { AppPage } from './app.po';

const expect = chai.use(chaiAsPromised).expect;
let appPage: AppPage = new AppPage();

Given('I open a page', function () {
  return browser.get('/').then(() => {
    element(by.css('h1')).getText()
      .then(text => {
        expect(text).to.have.string("Une solution en ligne pour les SSII")
      })
  });
});

Before(() => {
  appPage = new AppPage();
});

Given('I have navigated to the create page', () => {
  appPage.navigateTo();
  // browser.get('http://localhost:4200/timesheet/create');
  // return browser.wait(ExpectedConditions.visibilityOf(appPage.getTitle()), 5000);
  //TODO: se passer du localhost:4200 à l'avenir...
});
When('app page loads', () => {
  return browser.wait(ExpectedConditions.visibilityOf(appPage.getTitle()), 5000);
});

Then('header {string} is displayed', (title) => {
  return appPage.getParagraphText()
    .then(text => {
      expect(text).to.have.string(title)
    });
});
// When('I fill in my information in the form without respecting all the constraints', () => {
//   let input = element(by.model('timesheetService.timesheet.consultant.name'));
//   input.sendKeys('John Doe');
// });
// Then('I can see a message telling me the constraint not met', () => {
//   return browser.wait(() => {
//     browser.waitForAngularEnabled(true);
//     return browser.getCurrentUrl().then(url => {
//       expect(url).to.have.string('https://duckduckgo.com');
//     })
//   })
//   // expect(browser.getCurrentUrl()).to.have.string('https://duckduckgo.com');
// });
// Given(/^I have filled\-out the "([^"]*)", "([^"]*)" and "([^"]*)" forms$/, function () {
//
// });
// When(/^I click on "([^"]*)" button$/, function () {
//
// });
// Then(/^a success message appears$/, function () {
//
// });
// Then(/^the links appears except the invoice one$/, function () {
//
// });
// When(/^I have not filled\-out the form correctly$/, function () {
//
// });
// Then(/^a fail notification appears$/, function () {
//
// });
// Then(/^an error message appears near the input$/, function () {
//
// });
// Then(/^my inputs aren't validated$/, function () {
//
// });
// When(/^I validated the form$/, function () {
//
// });
// When(/^I change the value of an input$/, function () {
//
// });
// Then(/^the Links and success notification are hidden$/, function () {
//
// });
// Then(/^I have to validate the form$/, function () {
//
// });
// Given(/^the selected month is January (\d+)$/, function () {
//
// });
// Given(/^I have selected the first day$/, function () {
//
// });
// When(/^I click the (.*) button$/, function () {
//
// });
// Then(/^the selected month should be (.*)$/, function () {
//
// });
// Then(/^the days selection should have been emptied$/, function () {
//
// });
// When(/^I select the days I worked$/, function () {
//
// });
// Then(/^the "([^"]*)" should be updated as well$/, function () {
//
// });
// Given(/^I selected one day$/, function () {
//
// });
// When(/^I click on this day box$/, function () {
//
// });
// Then(/^this day is reset$/, function () {
//
// });
// Then(/^the days selection should have been updated$/, function () {
//
// });
// Given(/^I have selected a day$/, function () {
//
// });
// When(/^I hover on the blue pastille$/, function () {
//
// });
// Then(/^new choice appears$/, function () {
//
// });
// Given(/^I have displayed time options for a day$/, function () {
//
// });
// When(/^I click on half a day$/, function () {
//
// });
// Then(/^The blue pastille show "([^"]*)"$/, function () {
//
// });
// When(/^I click on zero$/, function () {
//
// });
// When(/^I click the Logo$/, function () {
//
// });
// Then(/^I should go to the "([^"]*)"$/, function () {
//
// });
