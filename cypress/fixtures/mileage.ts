import { errorMessage } from './errorMessage';

class Mileage {
  BUTTON_ADD = 'button-add-ik';
  BLOCK_DATE = 'ik-block-date';
  BLOCK_JOURNEY = 'ik-block-journey';
  BLOCK_DISTANCE = 'ik-block-distance';

  INPUT_VEHICLE = 'ik-input-vehicle';

  TABLE_TOTAL = 'ik-table-total';
  TABLE_DATE(id) {
    return `ik-table-${id}-date`;
  }
  TABLE_JOURNEY(id) {
    return `ik-table-${id}-journey`;
  }
  TABLE_DISTANCE(id) {
    return `ik-table-${id}-distance`;
  }
  TABLE_TAX_RATE(id) {
    return `ik-table-${id}-tax-rate`;
  }
  TABLE_MILEAGE(id) {
    return `ik-table-${id}-mileage`;
  }

  fillAndCheckCreate() {
    // Mileage Date
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_DATE, '2020-01-01');

    // Mileage Journey
    cy.checkInputRequiredByRole(this.BLOCK_JOURNEY);
    cy.getByRole(this.BLOCK_JOURNEY).within(() => {
      cy.get('input:first').type('42');
      cy.contains(errorMessage.NAME_ONLY_LETTERS).should('be.visible');
      cy.get('input:first').clear().type('AR Annecy - Lyon');
      cy.contains(errorMessage.NAME_ONLY_LETTERS).should('not.be.visible');
    });

    // Mileage Distance
    cy.checkInputRequiredByRole(this.BLOCK_DISTANCE);
    cy.getByRole(this.BLOCK_DISTANCE).within(() => {
      cy.get('input:first').type('test');
      cy.contains(errorMessage.ONLY_NUMBERS).should('be.visible');
      cy.get('input:first').clear().type('42');
      cy.contains(errorMessage.ONLY_NUMBERS).should('not.be.visible');
    });

    // Mileage Vehicle
    cy.getByRole(this.INPUT_VEHICLE).select('Taux légal: 4 CV (0.518€/km)');

    // Add Mileage
    cy.getByRole(this.BUTTON_ADD).click();

    // Check Mileage table
    cy.getByRole(this.TABLE_DATE(0)).should('contain', '01/01/2020');
    cy.getByRole(this.TABLE_JOURNEY(0)).should('contain', 'AR Annecy - Lyon');
    cy.getByRole(this.TABLE_DISTANCE(0)).should('contain', '42');
    cy.getByRole(this.TABLE_TAX_RATE(0)).should('contain', '0.518');
    cy.getByRole(this.TABLE_MILEAGE(0)).should('contain', '21,76');
    cy.getByRole(this.TABLE_TOTAL).should('contain', '21,76');
  }

  add(date, journey, distance, vehicle) {
    cy.typeInputRequiredByRole(this.BLOCK_DATE, date);
    cy.typeInputRequiredByRole(this.BLOCK_JOURNEY, journey);
    cy.typeInputRequiredByRole(this.BLOCK_DISTANCE, distance);
    cy.getByRole(this.INPUT_VEHICLE).select(vehicle);
    cy.getByRole(this.BUTTON_ADD).click();
  }
}

export const mileage = new Mileage();
