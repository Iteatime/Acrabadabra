describe("Timesheet > consultant", () => {
  beforeEach(() => {
    cy.netlifyLogin();
    cy.seed("salaried_with_mission");
    cy.visit("/timesheet/create");
  });

  it("mission > should have it's values from the mission", () => {
    cy.visit("/timesheet/create?mission=63cfae0988b7e2a4fc497a18");

    cy.getByCyAttr("consultant-name-input").should(
      "have.value",
      "Julien Lavocat"
    );
    cy.getByCyAttr("consultant-email-input").should(
      "have.value",
      "jlavocat@iteatime.fr"
    );
  });

  it("standard > should be empty without a mission", () => {
    cy.getByCyAttr("consultant-name-input").should("have.value", "");
    cy.getByCyAttr("consultant-email-input").should("have.value", "");
  });

  it("all > should keep it's parameters when reviewing a timesheet", () => {
    cy.fillBaseTimesheet({
      title: "Test",
      finalClientName: "Test client",
      consultant: {
        email: "test@email.com",
        name: "test consultant",
      },
    });

    cy.submitTimesheet();
    cy.goToReviewTimesheet();

    cy.getByCyAttr("consultant-name").should("have.text", "test consultant");
    // Email can't be tested as it's not visible on this page
  });

  it("all > should keep it's parameters when re-invoicing", () => {
    cy.fillBaseTimesheet({
      title: "Test",
      finalClientName: "Test client",
      consultant: {
        email: "test@email.com",
        name: "test consultant",
      },
    });
    cy.submitTimesheet();
    cy.goToReviewTimesheet();
    cy.goToReInvoiceTimesheet();

    cy.getByCyAttr("consultant-name-input").should(
      "have.value",
      "test consultant"
    );
    cy.getByCyAttr("consultant-email-input").should(
      "have.value",
      "test@email.com"
    );
  });

  it("all > should have it's name visible on the invoice", () => {
    cy.fillBaseTimesheet({
      title: "Test",
      finalClientName: "Test client",
      consultant: {
        email: "test@email.com",
        name: "test consultant",
      },
    });
    cy.submitTimesheet();
    cy.goToReviewTimesheet();
    cy.goToReInvoiceTimesheet();
    cy.fillBaseTimesheet({
      invoice: {
        client: {
          name: "test client",
          address: "test client address",
          phone: "test client phone",
          siren: "test client siren",
          rcsNumber: "test client rcs",
          vatNumber: "test client vat",
        },
        provider: {
          name: "test provider",
          address: "test provider address",
          phone: "test provider phone",
          siren: "test provider siren",
          rcsNumber: "test provider rcs",
          vatNumber: "test provider vat",
        },
        date: "2023-10-10",
        number: "Test number",
        workedRate: 10,
      },
    });
    cy.submitTimesheet();
    cy.goToInvoiceTimesheet();

    cy.getByCyAttr("additional-consultant-name").should(
      "have.text",
      "test consultant"
    );
  });
});
