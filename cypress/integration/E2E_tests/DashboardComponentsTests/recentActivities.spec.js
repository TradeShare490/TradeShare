describe('Recent Activities component can', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
        cy.fixture("url").then((jsonFile) => {
            cy.visit(
              `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.DASHBOARD}`
            );
          });
    })
    it('display recent activity box', () => {
        cy.get("[data-cy=recent-trades-card]").should("be.visible");
    });
    it('display recent activity information',()=>{
        cy.get("[data-cy=trader-name]").should("be.visible");
        cy.get("[data-cy=company-name]").should("be.visible");
        cy.get("[data-cy=trade-type]").should("be.visible");
        cy.get("[data-cy=trade-date]").should("be.visible");
        cy.get("[data-cy=options-button]").should("be.visible");
        cy.get("[data-cy=recent-trade-view-all]").should("be.visible");
    });
})