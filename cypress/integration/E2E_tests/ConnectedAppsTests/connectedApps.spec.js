/* eslint-disable cypress/no-unnecessary-waiting */
describe("On the connected apps page, can", () => {
    it("link and unlink apps", () => {
      cy.login();
      cy.wait(2000);
      cy.fixture("url").then((jsonFile) => {
        cy.visit(
          `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.CONNECTED_APPS}`
        );
      });
      cy.get("body").then(($body) => {
        cy.get("[data-cy=Alpaca-unlinked]").should('exist');
      });
      cy.get("body").then(($body) => {
        cy.get("[data-cy=Moomoo-linked]").should('be.disabled')
      });
    });
  });
  
