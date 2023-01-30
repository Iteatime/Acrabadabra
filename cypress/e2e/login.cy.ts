describe("Login", () => {
  beforeEach(() => {
    cy.netlifyLogin();
    cy.visit("/dashboard/mission/all");
  });

  it("should login and redirect to mission all page", () => {
    cy.urlEndsWith("/dashboard/mission/all");
    cy.get("app-mission-all").should("exist");
  });
  it("should log out and redirect to homepage", () => {
    cy.get("#userDropdown").click()
    cy.get(".fa-sign-out-alt").click()
    cy.wait(100)
    cy.get("iframe").should("exist")
    cy.get("iframe").its("form>button").click()
    cy.wait(3000)
    cy.get("#homepage").should("exist")
  })
});
