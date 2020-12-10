class Mission {
  BLOCK_TITLE = 'mission-block-title';
  BLOCK_CLIENT = 'mission-block-final-client';
  BLOCK_NAME = 'mission-block-name';
  BLOCK_CLIENT_REF = 'mission-block-client-ref';
  BLOCK_DATE_START = 'mission-block-date-start';
  BLOCK_DATE_END = 'mission-block-date-end';
  fillAndCheckCreate() {
    // Mission title
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_TITLE, 'Développeur PHP');

    // Mission final client
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_CLIENT, 'Bedrock');
  }
  adminFillAndCheckCreate() {
    // Mission name
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_NAME, 'Développeur PHP');

    // Mission client ref
    cy.typeInputByRole(this.BLOCK_CLIENT_REF, 'Bedrock');

    // Mission start date
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_DATE_START, '2020-01-01');

    // Mission end date
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_DATE_END, '2020-12-31');
  }

  routeCreate() {
    cy.route('POST', '**/.netlify/functions/missions').as('createMission');
  }

  waitCreate() {
    cy.wait('@createMission');
  }
}

export const mission = new Mission();
