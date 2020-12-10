import { BASE_URL, defineProdUrl, loginToNetlify } from '../accessor/cypress-config';
import { button } from '../fixtures/button';
import { netlify } from '../fixtures/netlify';

describe('Fetch homepage and check everything on it', function () {
  it('Check consultant button on homepage', () => {
    cy.visit(BASE_URL);

    cy.getByRole(button.CONSULTANT).contains('Je suis un consultant');
    cy.getByRole(button.CONSULTANT).click();
    cy.url().should('include', '/timesheet/create');
  });
  it('Check company button on homepage', () => {
    defineProdUrl();
    cy.visit(BASE_URL);

    cy.getByRole(button.COMPANY).contains('Je suis une société de services');
    cy.getByRole(button.COMPANY).click();
    cy.url().should('not.include', '/dashboard');
  });
  it('Connect User', () => {
    netlify.tryToLogin();
    cy.visit(BASE_URL);
    cy.getByRole(button.COMPANY).click();
    cy.url().should('include', '/dashboard');
  });
});
