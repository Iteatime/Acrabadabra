// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add('getByRole', role => cy.get(`[data-role="${role}"]`));
Cypress.Commands.add('checkInputRequiredByRole', role => {
  cy.getByRole(role).within(() => {
    cy.contains('Ce champ est obligatoire').should('not.be.visible');
    cy.get('input:first').focus().blur();
    cy.contains('Ce champ est obligatoire').should('be.visible');
  });
});
Cypress.Commands.add('typeInputRequiredByRole', (role, content) => {
  cy.getByRole(role).within(() => {
    cy.get('input:first').focus().clear().type(content).blur();
    cy.contains('Ce champ est obligatoire').should('not.be.visible');
  });
});
Cypress.Commands.add('typeAndTypeInputRequiredByRole', (role, content) => {
  cy.checkInputRequiredByRole(role);
  cy.typeInputRequiredByRole(role, content);
});
Cypress.Commands.add('typeInputByRole', (role, content) => {
  cy.getByRole(role).within(() => {
    cy.get('input:first').clear().type(content);
  });
});
