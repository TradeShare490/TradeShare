describe('On the TradeZone page, user posts can ', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
        cy.fixture("url").then((jsonFile) => {
            cy.visit(
              `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.POST}`
            );
          });
    })
    it("display the post information",()=>{
        cy.get("[data-cy=post-data]").should('be.visible');
    });
    it("display comment information",() => {
        cy.get("[data-cy=view-replies-btn]").click();
        cy.get("[data-cy=post-comment]").should('be.visible');
    })
})