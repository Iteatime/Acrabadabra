Cypress.Commands.add("getNetlifyIdentityFrame", () =>
  cy
    .get("iframe")
    .then(($elements) => cy.wrap($elements.contents().find("body").last()))
);

Cypress.Commands.add("netlifyLogin", (sessionName = "default-user") => {
  cy.session(sessionName, () => {
    window.localStorage.setItem("netlifySiteURL", Cypress.env("authUrl"));

    cy.visit("/");
    cy.get("#provider").click();

    cy.getNetlifyIdentityFrame()
      .find('input[name="email"]')
      .type(Cypress.env("email"));

    cy.getNetlifyIdentityFrame()
      .find('input[name="password"]')
      .type(Cypress.env("password"));

    cy.getNetlifyIdentityFrame().find('button[type="submit"]').click();

    cy.wait(10000);
  });
});

Cypress.Commands.add("urlEndsWith", (value: string) => {
  cy.log("Url should starts with", value);
  cy.url({ log: false }).then((url) => expect(url.endsWith(value)).to.be.true);
});

Cypress.Commands.add("seed", (seedName = "main") => {
  cy.exec(`mongorestore --drop --dir ./cypress/seeds/${seedName}`);
});
