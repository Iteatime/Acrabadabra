describe("Timesheet > mission", () => {
  beforeEach(() => {
    cy.netlifyLogin();
    cy.seed("salaried_with_mission");
    cy.visit("/timesheet/create");
  });

  it("mission > should have it's values from the mission", () => {
    cy.visit("/timesheet/create?mission=63cfae0988b7e2a4fc497a18");

    cy.getByCyAttr("mission-title-input").should(
      "have.value",
      "Développeur Web Junior"
    );
    cy.getByCyAttr("mission-final-client-input").should(
      "have.value",
      "Leadformance"
    );
  });

  it("standard > should be empty without a mission", () => {
    cy.getByCyAttr("mission-title-input").should("have.value", "");
    cy.getByCyAttr("mission-final-client-input").should("have.value", "");
  });

  it("all > should keep it's parameters when reviewing a timesheet", () => {
    cy.fillBaseTimesheet({
      title: "Test title",
      finalClientName: "Test client",
      consultant: {
        email: "test@email.com",
        name: "test consultant",
      },
    });

    cy.submitTimesheet();
    cy.goToReviewTimesheet();

    cy.getByCyAttr("client-name").should("have.text", "Test client");
    cy.getByCyAttr("mission-title").should("have.text", "Test title");
  });

  it("all > should keep it's parameters when re-invoicing", () => {
    cy.fillBaseTimesheet({
      title: "Test title",
      finalClientName: "Test client",
      consultant: {
        email: "test@email.com",
        name: "test consultant",
      },
    });
    cy.submitTimesheet();
    cy.goToReviewTimesheet();
    cy.goToReInvoiceTimesheet();

    cy.getByCyAttr("mission-title-input").should("have.value", "Test title");
    cy.getByCyAttr("mission-final-client-input").should(
      "have.value",
      "Test client"
    );
  });
});
