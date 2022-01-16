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
        cy.get("[data-cy=recentTradesCard]").should("be.visible");
    });
    it('display recent activity information',()=>{
        cy.get("[data-cy=traderName]").should("be.visible");
        cy.get("[data-cy=companyName]").should("be.visible");
        cy.get("[data-cy=tradeType]").should("be.visible");
        cy.get("[data-cy=tradeDate]").should("be.visible");
        cy.get("[data-cy=optionsButton]").should("be.visible");
        cy.get("[data-cy=recentTradeViewAll]").should("be.visible");
    });
})