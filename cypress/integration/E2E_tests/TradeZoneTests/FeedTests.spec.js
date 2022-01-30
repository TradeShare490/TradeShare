describe('On the TradeZone page, user posts can ', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
        cy.fixture("url").then((jsonFile) => {
            cy.visit(
              `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.TRADEZONE}`
            );
          });
    })

    it('be seen',() => {
        cy.get("[data-cy=feed-post]").should("be.visible");
    });
    it('be copied',() => {
        cy.get("[data-cy=copy-post-btn]").should('be.visible').first().click();
    });
})