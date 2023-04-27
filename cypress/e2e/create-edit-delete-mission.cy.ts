describe("Initialize tests", () => {
    beforeEach(() => {
        cy.netlifyLogin();
    });
    it("Should not have old test mission", () => {
        //Check for old test-generated mission to avoid conflicts
        cy.visit("/dashboard/mission/all");
        cy.get(".d-block").each(($el) => {
            cy.wrap($el).should('not.include.text', 'Consultant 1 Client 1 | 01/01/20');
            cy.wrap($el).should('not.include.text', 'Consultant 2 Client 2 | 02/01/20');
            //If this fails, delete manually the test mission in the dashboard.
        })
    })
})
describe("When creating a mission :", () => {
    beforeEach(() => {
        cy.netlifyLogin();
    });
    it("Should fill the form, submit, show a notification and redirect to dashboard", () => {
        cy.visit("/dashboard/mission/create/");
        cy.get("input[id=mission_title]").type("Mission 1");
        cy.get("input[id=mission_start-date]").type("2020-01-01");
        cy.get("input[id=mission_end-date]").type("2020-01-02");
        cy.get("input[id=mission_details-unitOfWorkPrice]").type("100");
        cy.get("input[id=mission_consultant]").type("Consultant 1");
        cy.get("input[id=mission_consultant-email]").type("consultant@email.com");
        cy.get("input[id=consultantCompanyName]").type("Consultant Company");
        cy.get("input[id=consultantCompanyAddress]").type("1 rue de la Consultation");
        cy.get("input[id=consultantCompanyPhone]").type("0123456789");
        cy.get("input[id=consultantCompanySiren]").type("123456789");
        cy.get("input[id=consultantCompanyTradeAndCompaniesRegisterCity]").type("Paris");
        cy.get("input[id=consultantCompanyVatNumber]").type("54321");
        cy.get("input[id=mission_consultant-unitOfWorkPrice]").type("100");
        cy.get("input[id=consultantCompanyHolder]").type("Consultant Company");
        cy.get("input[id=consultantCompanySwift]").type("123456789");
        cy.get("input[id=consultantCompanyIban]").type("123456789");
        cy.get("input[id=consultantCompanyDomiciliation]").type("Banque 1");
        cy.get("input[id=consultantCompanyAgency]").type("Agence 1");
        cy.get("input[id=mission_client-ref]").type("REF01");
        cy.get("input[id=missionClientEmail]").type("client@email.com");
        cy.get("input[id=mission_client_name]").type("Client 1");
        cy.get("input[id=mission_client_address]").type("1 rue du Client");
        cy.get("input[id=mission_client_phone]").type("0123456789");
        cy.get("input[id=mission_client_siren]").type("123456789");
        cy.get("input[id=mission_client_trade-and-companies-register-city]").type("Paris");
        cy.get("input[id=mission_client_vat-number]").type("54321");
        cy.get("input[id=mission_details-paymentMode]").type("Virement");
        cy.get("input[type=submit]").click();
        cy.wait(2000);
        cy.url().then(
            (url) => expect(url.endsWith("/dashboard/mission/all")).to.be.true
        );
        cy.get(".notifications__item").should("exist");
    })
    it("Should display the mission in the list", () => {
        cy.visit("/dashboard/mission/all");
        cy.get(".col-lg-6.mb-2").parent().should('include.text', 'Consultant 1 Client 1 | 01/01/20');
    })
});
describe("When editing a mission", () => {
    beforeEach(() => {
        cy.netlifyLogin();
    });
    it("Should fill the form, submit, show a notification and redirect to dashboard", () => {
        cy.visit("/dashboard/mission/all");

        cy.get(".d-block").contains("Consultant 1 Client 1 | 01/01/20 ").click()
        cy.get(".fa-pen:visible").click();
        cy.url().then(
            (url) => expect(url.includes("/dashboard/mission/create?mission=")).to.be.true
        )
        cy.get("input[id=mission_title]").clear().type("Mission 2");
        cy.get("input[id=mission_start-date]").clear().type("2020-01-02");
        cy.get("input[id=mission_end-date]").clear().type("2020-01-03");
        cy.get("input[id=mission_details-unitOfWorkPrice]").clear().type("200");
        cy.get("input[id=mission_consultant]").clear().type("Consultant 2");
        cy.get("input[id=mission_consultant-email]").clear().type("newconsultant@email.com");
        cy.get("input[id=consultantCompanyName]").clear().type("Consultant Company 2");
        cy.get("input[id=consultantCompanyAddress]").clear().type("2 rue de la Consultation");
        cy.get("input[id=consultantCompanyPhone]").clear().type("9876543210");
        cy.get("input[id=consultantCompanySiren]").clear().type("987654321");
        cy.get("input[id=consultantCompanyTradeAndCompaniesRegisterCity]").clear().type("Marseille");
        cy.get("input[id=consultantCompanyVatNumber]").clear().type("12345");
        cy.get("input[id=mission_consultant-unitOfWorkPrice]").clear().type("200");
        cy.get("input[id=consultantCompanyHolder]").clear().type("Consultant Company 2");
        cy.get("input[id=consultantCompanySwift]").clear().type("987654321");
        cy.get("input[id=consultantCompanyIban]").clear().type("987654321");
        cy.get("input[id=consultantCompanyDomiciliation]").clear().type("Banque 2");
        cy.get("input[id=consultantCompanyAgency]").clear().type("Agence 2");
        cy.get("input[id=mission_client-ref]").clear().type("REF02");
        cy.get("input[id=missionClientEmail]").clear().type("newclient@email.com");
        cy.get("input[id=mission_client_name]").clear().type("Client 2");
        cy.get("input[id=mission_client_address]").clear().type("2 rue du Client");
        cy.get("input[id=mission_client_phone]").clear().type("9876543210");
        cy.get("input[id=mission_client_siren]").clear().type("987654321");
        cy.get("input[id=mission_client_trade-and-companies-register-city]").clear().type("Marseille");
        cy.get("input[id=mission_client_vat-number]").clear().type("12345");
        cy.get("input[id=mission_details-paymentMode]").clear().type("Chèque");
        cy.get("input[type=submit]").click();
        cy.wait(2000);
        cy.url().then(
            (url) => expect(url.endsWith("/dashboard/mission/all")).to.be.true
        );
        cy.get(".notifications__item").should("exist");
    })
    it("Should display the edited mission in the list", () => {
        cy.visit("/dashboard/mission/all");
        cy.get(".col-lg-6.mb-2").parent().parent().should('include.text', 'Consultant 2 Client 2 | 02/01/20');
    })
})


describe("When deleting a mission :", () => {
    beforeEach(() => {
        cy.netlifyLogin();
    });
    it("Should delete the mission", () => {
        cy.visit("/dashboard/mission/all");
        cy.get(".d-block").contains("Consultant 2 Client 2 | 02/01/20 ").click()
        cy.get(".fa-trash:visible").click();
        cy.on("window.confirm", () => true);
        return;
    })

    it("Should have removed mission from list", () => {
        cy.visit("/dashboard/mission/all");
        cy.get(".d-block").each(($el) => {
            cy.wrap($el).should('not.include.text', 'Consultant 2 Client 2 | 02/01/20 ');
        })
    })
})