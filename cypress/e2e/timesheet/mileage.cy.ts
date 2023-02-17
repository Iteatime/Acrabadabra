function checkAdditionalFees() {
  cy.getByCyAttr("commutes-toggle").check();
  cy.get("app-expense-mileage-form .mileage-allowance-form").should("exist");
  cy.getByCyAttr("mileage-table-total").should("exist");
}

describe("Timesheet > mileage", () => {
  beforeEach(() => {
    cy.netlifyLogin();
    cy.seed("salaried_with_mission");
    cy.visit("/timesheet/create?mission=63cfae0988b7e2a4fc497a18");
    cy.fillBaseTimesheet({
      consultant: {
        email: "test@iteatime.fr",
        name: "Test consultant",
      },
      finalClientName: "Test client",
      title: "Test mission",
    });
    checkAdditionalFees();
  });

  it("should allow me to enter one expanse to my milleage allowances", () => {
    cy.enterMileageAllowance(new Date(), "Grenoble", "60", 3, 0);
  });

  it("should allow me to enter multiple expanse to my milleage allowances", () => {
    cy.enterMileageAllowance(new Date(), "Grenoble", "60", 3, 0);
    cy.enterMileageAllowance(
      new Date(),
      "Chambéry",
      "80",
      2,
      1,
      "0.518",
      "41,44"
    );

    cy.getByCyAttr("mileage-table-row").should("have.length", 2);
  });

  it("should have the correct amount for each mileage types", () => {
    cy.enterMileageAllowance(new Date(), "3CV", "20", 1, 0, "0.451", "9,02");
    cy.enterMileageAllowance(new Date(), "4CV", "20", 2, 1, "0.518", "10,36");
    cy.enterMileageAllowance(new Date(), "5CV", "20", 3, 2, "0.543", "10,86");
    cy.enterMileageAllowance(new Date(), "6CV", "20", 4, 3, "0.568", "11,36");
    cy.enterMileageAllowance(new Date(), "7CV", "20", 5, 4, "0.595", "11,90");
    cy.getByCyAttr("mileage-table-total")
      .find("td:nth-child(5)")
      .should("have.text", "Total HT: 53,50 €");
  });

  it("should allows to enter a custom mileage type", () => {
    const dateString = new Date().toISOString().split("T")[0];
    cy.getByCyAttr("mileage-input-date").clear().type(dateString);
    cy.getByCyAttr("mileage-input-journey").clear().type("Custom");
    cy.getByCyAttr("mileage-input-distance").clear().type("10");

    cy.getByCyAttr("mileage-input-taxRate").should("not.exist");
    cy.getByCyAttr("mileage-input-vehicle").select(6);

    cy.getByCyAttr("mileage-input-taxRate")
      .shouldBeVisibleAfterScroll()
      .type("2");

    cy.getByCyAttr("mileage-submit-btn").click();

    const getAllowanceTds = () =>
      cy.get(".mileage__body tr:nth-child(1)").find("td");

    cy.get(".mileage__body tr")
      .should("have.length", 2)
      .eq(0)
      .find("td")
      .should("have.length", 6);

    const [expectedYear, expectedDay, expectedMonth] = dateString.split("-");
    getAllowanceTds()
      .eq(0)
      .should(
        "have.text",
        [expectedMonth, expectedDay, expectedYear].join("/")
      );

    getAllowanceTds().eq(1).should("have.text", "Custom");
    getAllowanceTds().eq(2).should("have.text", "10");
    getAllowanceTds().eq(3).should("have.text", "2");
    getAllowanceTds().eq(4).should("have.text", "20,00 €");
    getAllowanceTds().eq(5).should("have.text", "delete");
    cy.getByCyAttr(`mileage-table-total`).should("exist");
  });

  it("should send all mileage expanses to the review timesheet", () => {
    cy.enterMileageAllowance(new Date(), "3CV", "20", 1, 0, "0.451", "9,02");
    cy.enterMileageAllowance(new Date(), "4CV", "20", 2, 1, "0.518", "10,36");
    cy.enterMileageAllowance(new Date(), "5CV", "20", 3, 2, "0.543", "10,86");
    cy.enterMileageAllowance(new Date(), "6CV", "20", 4, 3, "0.568", "11,36");
    cy.enterMileageAllowance(new Date(), "7CV", "20", 5, 4, "0.595", "11,90");
    cy.getByCyAttr(`mileage-table-total`).should("exist");

    cy.getByCyAttr("submitTimesheetBtn").first().click();
    cy.goToReviewTimesheet();

    cy.getByCyAttr("mileage-table-row").should("have.length", 5);
    cy.getByCyAttr("mileage-table-total").should("exist");

    const date = new Date().toISOString().split("T")[0];

    cy.checkMileageAllowance(date, "3CV", "20", 0, "0.451", "9,02", false);
    cy.checkMileageAllowance(date, "4CV", "20", 1, "0.518", "10,36", false);
    cy.checkMileageAllowance(date, "5CV", "20", 2, "0.543", "10,86", false);
    cy.checkMileageAllowance(date, "6CV", "20", 3, "0.568", "11,36", false);
    cy.checkMileageAllowance(date, "7CV", "20", 4, "0.595", "11,90", false);

    cy.getByCyAttr("mileage-table-total")
      .find("td:nth-child(5)")
      .should("have.text", "Total HT: 53,50 €");
  });

  it("should have all mileage expanses visibles when re-invoicing", () => {
    cy.enterMileageAllowance(new Date(), "3CV", "20", 1, 0, "0.451", "9,02");
    cy.enterMileageAllowance(new Date(), "4CV", "20", 2, 1, "0.518", "10,36");
    cy.enterMileageAllowance(new Date(), "5CV", "20", 3, 2, "0.543", "10,86");
    cy.enterMileageAllowance(new Date(), "6CV", "20", 4, 3, "0.568", "11,36");
    cy.enterMileageAllowance(new Date(), "7CV", "20", 5, 4, "0.595", "11,90");

    cy.getByCyAttr("submitTimesheetBtn").first().click();

    cy.goToReviewTimesheet();
    cy.goToReInvoiceTimesheet();

    cy.getByCyAttr("commutes-toggle").should("be.checked");
    cy.getByCyAttr("mileage-table-row").should("have.length", 5);
    cy.getByCyAttr("mileage-table-total").should("exist");

    const date = new Date().toISOString().split("T")[0];

    cy.checkMileageAllowance(date, "3CV", "20", 0, "0.451", "9,02", true);
    cy.checkMileageAllowance(date, "4CV", "20", 1, "0.518", "10,36", true);
    cy.checkMileageAllowance(date, "5CV", "20", 2, "0.543", "10,86", true);
    cy.checkMileageAllowance(date, "6CV", "20", 3, "0.568", "11,36", true);
    cy.checkMileageAllowance(date, "7CV", "20", 4, "0.595", "11,90", true);

    cy.getByCyAttr("mileage-table-total")
      .find("td:nth-child(5)")
      .should("have.text", "Total HT: 53,50 €");
  });

  it("should have all mileage expanses visibles on invoice (timesheet creation -> validating -> re-invoicing -> invoice)", () => {
    const checkMileageTable = (isEditMode = false) => {
      const date = new Date().toISOString().split("T")[0];
      cy.checkMileageAllowance(
        date,
        "3CV",
        "20",
        0,
        "0.451",
        "9,02",
        isEditMode
      );

      cy.checkMileageAllowance(
        date,
        "4CV",
        "20",
        1,
        "0.518",
        "10,36",
        isEditMode
      );
      cy.checkMileageAllowance(
        date,
        "5CV",
        "20",
        2,
        "0.543",
        "10,86",
        isEditMode
      );
      cy.checkMileageAllowance(
        date,
        "6CV",
        "20",
        3,
        "0.568",
        "11,36",
        isEditMode
      );
      cy.checkMileageAllowance(
        date,
        "7CV",
        "20",
        4,
        "0.595",
        "11,90",
        isEditMode
      );
    };

    cy.fillBaseTimesheet({
      consultant: {
        email: "test@iteatime.fr",
        name: "Test consultant",
      },
      finalClientName: "Test client",
      title: "Test mission",
    });
    cy.enterMileageAllowance(new Date(), "3CV", "20", 1, 0, "0.451", "9,02");
    cy.enterMileageAllowance(new Date(), "4CV", "20", 2, 1, "0.518", "10,36");
    cy.enterMileageAllowance(new Date(), "5CV", "20", 3, 2, "0.543", "10,86");
    cy.enterMileageAllowance(new Date(), "6CV", "20", 4, 3, "0.568", "11,36");
    cy.enterMileageAllowance(new Date(), "7CV", "20", 5, 4, "0.595", "11,90");

    cy.getByCyAttr("submitTimesheetBtn").first().click();
    cy.goToReviewTimesheet();

    checkMileageTable();

    cy.goToReInvoiceTimesheet();
    cy.fillBaseTimesheet({
      invoice: {
        date: new Date().toISOString().split("T")[0],
        number: "Invoice-Number-1",
        workedRate: 10,
        provider: {},
        client: {
          ref: "Test client",
        },
      },
    });

    checkMileageTable(true);

    cy.getByCyAttr("submitTimesheetBtn").first().click();
    cy.goToInvoiceTimesheet();

    cy.getByCyAttr("invoice-table-body")
      .find("tr")
      .then((rows) => {
        expect(rows).to.have.length(4);

        expect(rows.eq(1).find("td").first().text()).to.equal("");

        const tds = rows.first().find("td");

        expect(tds.eq(0).text()).to.equal("Indémnités kilométriques");
        expect(tds.eq(1).text()).to.equal("53,50 €");
        expect(tds.eq(2).text()).to.equal("1");
        expect(tds.eq(3).text()).to.equal(" 20,00 %");
        expect(tds.eq(4).text()).to.equal("53,50 €");
        expect(tds.eq(5).text()).to.equal(" 64,20 € ");
      });

    cy.getByCyAttr("mileage-table-body").find("tr").should("have.length", 6); // 1 more for the total
    checkMileageTable();
  });
});
