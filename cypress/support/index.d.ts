declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    getByRole(value: string): Chainable<Element>;
    checkInputRequiredByRole(value: string): Chainable<Element>;
    typeInputRequiredByRole(value: string, content: string): Chainable<Element>;
    typeInputByRole(value: string, content: string): Chainable<Element>;
    typeAndTypeInputRequiredByRole(value: string, content: string): Chainable<Element>;
  }
}
