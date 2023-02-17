describe("When browsing the dashboard:", () => {
    beforeEach(() => {
        cy.visit("/dashboard/mission/all");
    })
    it("Should display header", () => {
        cy.get(".sidebar-brand").should("be.visible");
        cy.get("#userDropdown").click()
        cy.get(".dropdown-menu").should("be.visible");
    });
    it("Should redirect to home", () => {
        cy.get(".sidebar-brand").click();
        cy.url().then(
            (url) => expect(url.endsWith("/")).to.be.true
        );
    });

})