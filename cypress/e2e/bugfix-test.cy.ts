const fillinvoiceformvalues = {
    consultantNameInput: "Jérôme Bodineau",
    consultantEmailInput: "jerome@bodineau.io",
    missionTitleInput: "Développeur Full Stack Senior - Grenoble",
    missionFinalClientInput: "Iteatime",
    invoiceNumber: "",
    invoiceClientRefInput: "",
    invoiceDateInput: "",
    invoiceWorkedRateInput: "420",

    invoiceProviderNameInput: "Jérôme Bodineau",
    invoiceProviderAddressInput: "406 route de Rigaudière",
    invoiceProviderTelephoneInput: "0609424261",
    invoiceProviderSIRENInput: "792620056",
    invoiceProviderTradeAndCompaniesRegisterCityInput: "GRENOBLE",
    invoiceProviderVATNumberInput: "FR46792620056",

    invoiceClientNameInput: "SAS Iteatime",
    invoiceClientAddressInput: "38 rue Villedieu 33000 Bordeaux",
    invoiceClientTelephoneInput: "",
    invoiceClientSIRENInput: "790488894",
    invoiceClientTradeAndCompaniesRegisterCityInput: "Bordeaux",
    invoiceClientVATNumberInput: "FR24790488894",

    invoicePaymentDateInput: "",
    invoicePaymentModalityInput: "",

    invoiceBankAccountHolderInput: "Jérôme Bodineau",
    invoiceBankDetailsSWIFTInput: "QNTOFRP1XXX",
    invoiceBankDetailsIBANInput: "FR76 1695 8000 0143 5209 9188 223",
    invoiceBankDetailsDomiciliationInput: "Qonto",
    invoiceBankingAgencyInput: "",
};

describe("Bugfix test", () => {
    beforeEach(() => {
        //cy.netlifyLogin();
        //cy.seed("company_only");
    });

    it("should not have checkbox auto-checked", () => {
        cy.visit("/timesheet/create");
        cy.get("div.timesheet-edit__wrapper__form__component:nth-child(5) > label:nth-child(1)").click()
        cy.wrap(Object.entries(fillinvoiceformvalues)).each(([key, value]: [string, any]) => {
            if (typeof value !== "object" && value != "") {
                cy.get(`input[name=${key}]`).type(value);
                cy.get(`input[name=${key}]`).should("have.value", value);
            }
        });
        cy.get(".timesheet-edit__wrapper__form__submit__button").click()

    });
});
