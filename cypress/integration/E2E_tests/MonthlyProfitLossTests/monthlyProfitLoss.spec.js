describe('Monthly P/L component can', () => {
    before(() => {
        cy.login();
        cy.wait(5000);
    })
    it.skip('displays monetary value of monthly change', () => {
        cy.get("[data-cy=pl-value]").should("include.text", "$")
    });
    it.skip('displays title', () => {
        cy.get("[data-cy=pl-title]").should("include.text", "Monthly Realized P/L")
    });
    it.skip('displays a percent of change over the month', () => {
        cy.get("[data-cy=pl-percent-change]").contains(/((-?)\d+%)/)
    })
})