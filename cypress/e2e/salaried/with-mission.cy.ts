describe("Freelance > mission > create", () => {
  beforeEach(() => {
    cy.seed("salaried_with_mission");
    cy.visit("/timesheet/create?mission=63cfae0988b7e2a4fc497a18");
  });

  it("should not have a checkbox to generate an invoice", () => {
    cy.get('input[name="invoiceToggle"]').should("not.exist");
  });

  it("should have a checkbox enabling to enter additional fees", () => {
    cy.get('input[name="commutesToggle"]')
      .should("exist")
      .shouldBeVisibleAfterScroll();
  });

  it("consultant's section should be pre-filled with mission's data", () => {
    cy.get('input[name="consultantNameInput"]')
      .should("have.value", "Julien Lavocat")
      .shouldBeVisibleAfterScroll();

    cy.get('input[name="consultantEmailInput"]')
      .should("have.value", "jlavocat@iteatime.fr")
      .shouldBeVisibleAfterScroll();
  });

  it("mission's section should be pre-filled with mission's data", () => {
    cy.get('input[name="missionTitleInput"]')
      .should("have.value", "Développeur Web Junior")
      .shouldBeVisibleAfterScroll();

    cy.get('input[name="missionFinalClientInput"]')
      .should("have.value", "Leadformance")
      .shouldBeVisibleAfterScroll();
  });

  it("should show an additional fees section when prompted to", () => {
    cy.get("app-expense-mileage-form").should("not.exist");
    cy.get('input[name="commutesToggle"]').check();
    cy.get("app-expense-mileage-form").should("exist");
  });
});
