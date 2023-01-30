const values = {
  address: "18 rue Villedieu",
  bankAccount: {
    holder: "Paul Filipi",
    swift: "CCBPFRPP",
    iban: "FR8330003000401979377852A14",
    domiciliation: "Banque Populaire",
    agency: "Banque Populaire Bordeaux",
  },
  city: "Bordeaux",
  name: "Iteatime SAS",
  phone: "0808080808",
  siren: "790488894",
  tradeAndCompaniesRegisterCity: "Bordeaux",
  vatNumber: "FR24790488894",
  zipCode: "33000",
};

describe("Seeds", () => {
  beforeEach(() => {
    cy.seed("company_only");
    cy.netlifyLogin();
  });

  it("should correctly seed the database without errors", () => {
    cy.visit("/dashboard/company");

    cy.wrap(Object.entries(values)).each(([key, value]: [string, any]) => {
      if (typeof value !== "object")
        cy.get(`input[name=${key}]`).should("have.value", value);
    });
  });
});
