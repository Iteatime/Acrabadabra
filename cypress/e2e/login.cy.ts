describe("Login", () => {
  beforeEach(() => {
    cy.netlifyLogin();
    cy.visit("/dashboard/mission/all");
  });

  it("should login and redirect to mission all page", () => {
    cy.urlEndsWith("/dashboard/mission/all");
    cy.get("app-mission-all").should("exist");
  });
});
