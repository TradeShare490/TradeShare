describe('Recent Activities component can', () => {
    before(() => {
        cy.login();
        cy.wait(5000);
    })
    it('display recent activity box', () => {
        cy.get("[data-cy=recent-trades-card]").should("be.visible");
    });
    it('display recent activity information',()=>{
        cy.get("[data-cy=trader-name]").should("be.visible");
        cy.get("[data-cy=company-tag]").should("be.visible");
        cy.get("[data-cy=company-name]").should("be.visible");
        cy.get("[data-cy=trade-type]").should("be.visible");
        cy.get("[data-cy=trade-date]").should("be.visible");
    });
})