describe("When browsing the HomePage :", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display page's title as Acrabadabra", () => {
    cy.title().should("eq", "Acrabadabra");
  });

  it("should display the baseline", () => {
    cy.contains("Une solution en ligne pour les SSII").should("exist");
  });

  it("should have a button to create a new CRA", () => {
    cy.get("#consultant").should("exist");
  });

  it("should have a button to access the SSI's dashboard", () => {
    cy.get("#provider").should("exist");
  });

  it("should redirect to create a CRA page", () => {
    cy.get("#consultant").click();
    cy.url().then(
      (url) => expect(url.endsWith("/timesheet/create")).to.be.true
    );
  });

  it("should open a popup to login to the dashboard", () => {
    cy.get("#netlify-identity-widget").should("not.be.visible");
    cy.get("#provider").click();
    cy.get("#netlify-identity-widget", { timeout: 10000 }).should("be.visible");
  });
});
