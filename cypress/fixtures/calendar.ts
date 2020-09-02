class Calendar {
  fillAndCheckCreate() {
    // Calendar
    cy.getByRole('unit-count').should('contain', '0');

    for (let i = 1; i < 10; i++) {
      cy.getByRole('calendar-true-0' + i).click();
      cy.getByRole('unit-count').should('contain', i);
    }
    /*cy.getByRole('calendar-true-10').click();
    cy.getByRole('calendar-true-10-day-changer').trigger('mouseover').then(() => {
      cy.get('calendar-true-10-button-half-day').click();
    });
    cy.getByRole('unit-count').should('contain', '10,5');*/
    cy.getByRole('button-unselect-open-days').click();
    cy.getByRole('unit-count').should('contain', '0');
    cy.getByRole('button-select-open-days').click();
    cy.getByRole('unit-count').should('contain', '21');
    cy.getByRole('unit-count').invoke('text').then(text => {
      expect(parseInt(text)).to.be.greaterThan(0);
    });
  }
}

export const calendar = new Calendar();
