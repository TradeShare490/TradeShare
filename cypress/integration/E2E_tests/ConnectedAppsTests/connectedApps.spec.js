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
      // cy.get("body").then(($body) => {
      //   cy.get("[data-cy=Alpaca-unlinked]").click();
      //   cy.get("[data-cy=Alpaca-handleDialogActionSubmit]").click();
      //   cy.get("[data-cy=Alpaca-linked]").should('exist');
      // });
      // cy.get("body").then(($body) => {
      //   cy.get("[data-cy=Moomoo-linked]").click();
      //   cy.get("[data-cy=Moomoo-handleDialogActionCancel]").click();
      //   cy.get("[data-cy=Moomoo-linked]").click();
      //   cy.get("[data-cy=Moomoo-handleDialogActionSubmit]").click();
      //   cy.get("[data-cy=Moomoo-unlinked]");
      // });
    });
  });
  
