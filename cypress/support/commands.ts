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

Cypress.Commands.add(
  "shouldBeVisibleAfterScroll",
  {
    prevSubject: "element",
  },
  (subject) => {
    return cy.wrap(subject).scrollIntoView().should("be.visible");
  }
);

Cypress.Commands.add(
  "enterMileageAllowance",
  (
    date,
    journey,
    distance,
    type,
    indexWhenAdded,
    mileageRate = "0.543",
    totalMileage = "32,58"
  ) => {
    const dateString = date.toISOString().split("T")[0];
    cy.log(
      `Entering mileage #${indexWhenAdded}: ${dateString} | ${journey} | ${distance} | ${type} | ${mileageRate} | ${totalMileage}`
    );
    cy.getByCyAttr("mileage-input-date", { log: false })
      .clear({ log: false })
      .type(dateString, { log: false });
    cy.getByCyAttr("mileage-input-journey", { log: false })
      .clear({ log: false })
      .type(journey, { log: false });
    cy.getByCyAttr("mileage-input-distance", { log: false })
      .clear({ log: false })
      .type(distance, { log: false });
    cy.getByCyAttr("mileage-input-vehicle", { log: false }).select(type, {
      log: false,
    });
    cy.getByCyAttr("mileage-submit-btn", { log: false }).click({
      log: false,
    });

    cy.checkMileageAllowance(
      dateString,
      journey,
      distance,
      indexWhenAdded,
      mileageRate,
      totalMileage,
      true
    );
  }
);

Cypress.Commands.add(
  "checkMileageAllowance",
  (
    date,
    journey,
    distance,
    indexWhenAdded,
    mileageRate,
    totalMileage,
    editMode
  ) => {
    cy.log(
      `expecting mileage row #${indexWhenAdded} to be: ${date} | ${journey} | ${distance} | ${mileageRate} | ${totalMileage}`
    );
    cy.getByCyAttr(`mileage-table-row`, { log: false })
      .eq(indexWhenAdded, { log: false })
      .find("td", { log: false })
      .should("have.length", editMode ? 6 : 5);

    const getAllowanceTds = () =>
      cy
        .getByCyAttr(`mileage-table-row`, { log: false })
        .eq(indexWhenAdded, { log: false })
        .find("td", { log: false });

    const [expectedYear, expectedDay, expectedMonth] = date.split("-");
    getAllowanceTds()
      .eq(0, { log: false })
      .should(
        "have.text",
        [expectedMonth, expectedDay, expectedYear].join("/")
      );

    getAllowanceTds().eq(1, { log: false }).should("have.text", journey);
    getAllowanceTds().eq(2, { log: false }).should("have.text", distance);
    getAllowanceTds().eq(3, { log: false }).should("have.text", mileageRate);
    getAllowanceTds()
      .eq(4, { log: false })
      .should("have.text", totalMileage + " €");

    editMode ??
      getAllowanceTds().eq(5, { log: false }).should("have.text", "delete");
  }
);

Cypress.Commands.add("goToReviewTimesheet", () => {
  return cy
    .get('[data-cy="copy-review-timesheet-link"', { log: false })
    .invoke({ log: false }, "attr", "data-cy-link")
    .then((url) =>
      cy.log(`Going to review timesheet ${url}`).visit(url, { log: false })
    );
});

Cypress.Commands.add("goToReInvoiceTimesheet", () => {
  return cy
    .get('[data-cy="re-invoice-timesheet"', { log: false })
    .click({ log: false })
    .log("Re-invocing timesheet");
});

Cypress.Commands.add("goToInvoiceTimesheet", () => {
  return cy
    .get('[data-cy="copy-review-timesheet-link"', { log: false })
    .invoke({ log: false }, "attr", "data-cy-link")
    .then((url) => {
      cy.log(
        `Going to invoice timesheet: /invoice/${url.split("/").slice(-1)}`
      );
      return cy.visit(`/invoice/${url.split("/").slice(-1)}`, { log: false });
    });
});

Cypress.Commands.add("getByCyAttr", (name: string, options) => {
  return cy.get(`[data-cy="${name}"]`, { log: options?.log });
});

Cypress.Commands.add("fillBaseTimesheet", (timesheet) => {
  // This is really fucking messy but you can't call .type() with an undefined or empty string, so there is not much else to do...

  cy.log("Filling timesheet with", timesheet);

  timesheet?.title &&
    cy
      .getByCyAttr("mission-title-input", { log: false })
      .type(`{selectall}{backspace}${timesheet?.title || ""}`, { log: false });
  timesheet?.finalClientName &&
    cy
      .getByCyAttr("mission-final-client-input", { log: false })
      .type(`{selectall}{backspace}${timesheet?.finalClientName || ""}`, {
        log: false,
      });

  if (timesheet.consultant) {
    const consultant = timesheet.consultant;

    consultant.name &&
      cy
        .getByCyAttr("consultant-name-input", { log: false })
        .type(`{selectall}{backspace}${timesheet.consultant?.name || ""}`, {
          log: false,
        });

    consultant.email &&
      cy
        .getByCyAttr("consultant-email-input", { log: false })
        .type(`{selectall}{backspace}${timesheet.consultant?.email || ""}`, {
          log: false,
        });
  }

  if (timesheet.invoice) {
    const invoice = timesheet.invoice;
    cy.getByCyAttr("generate-invoice-toggle", { log: false }).check({
      log: false,
    });

    invoice.number &&
      cy
        .getByCyAttr("invoice-number", { log: false })
        .type(`{selectall}{backspace}${invoice.number || ""}`, { log: false });

    invoice.date &&
      cy
        .getByCyAttr("invoice-date", { log: false })
        .type(`${invoice.date || ""}`, { log: false });

    invoice.workedRate &&
      cy
        .getByCyAttr("invoice-workedRate", { log: false })
        .type(`{selectall}{backspace}${invoice.workedRate || ""}`, {
          log: false,
        });

    const fillLegalEntity = (
      entity: Partial<Cypress.InvoiceLegalEntity>,
      name: string
    ) => {
      console.log(entity);
      entity.name &&
        cy
          .getByCyAttr(`invoice-${name}-name`, { log: false })
          .type(`{selectall}{backspace}${entity.name || ""}`, {
            log: false,
          });
      entity.address &&
        cy
          .getByCyAttr(`invoice-${name}-address`, { log: false })
          .type(`{selectall}{backspace}${entity.address || ""}`, {
            log: false,
          });
      entity.phone &&
        cy
          .getByCyAttr(`invoice-${name}-phone`, { log: false })
          .type(`{selectall}{backspace}${entity.phone || ""}`, {
            log: false,
          });
      entity.siren &&
        cy
          .getByCyAttr(`invoice-${name}-siren`, { log: false })
          .type(`{selectall}{backspace}${entity.siren || ""}`, {
            log: false,
          });
      entity.rcsExemption &&
        cy.getByCyAttr(`invoice-${name}-rcs-exemption`, { log: false }).check();
      entity.rcsNumber &&
        cy
          .getByCyAttr(`invoice-${name}-rcs-number`, { log: false })
          .type(`{selectall}{backspace}${entity.rcsNumber || ""}`, {
            log: false,
          });
      entity.vatExemption &&
        cy
          .getByCyAttr(`invoice-${name}-vat-exemption`, { log: false })
          .type(`{selectall}{backspace}${entity.vatExemption || ""}`, {
            log: false,
          });
      entity.vatNumber &&
        cy
          .getByCyAttr(`invoice-${name}-vat-number`, { log: false })
          .type(`{selectall}{backspace}${entity.vatNumber || ""}`, {
            log: false,
          });
    };

    invoice.provider && fillLegalEntity(invoice.provider, "provider");
    invoice.client && fillLegalEntity(invoice.client, "client");
  }
});

Cypress.Commands.add("submitTimesheet", () => {
  cy.getByCyAttr("submit-timesheet-btn", { log: false })
    .scrollIntoView()
    .click({ log: false });
});
