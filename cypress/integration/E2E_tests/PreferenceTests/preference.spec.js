/* eslint-disable cypress/no-unnecessary-waiting */
describe("Can", () => {
    it("open the preference tab", () => {
      cy.login();
      cy.wait(2000);
      cy.fixture("url").then((jsonFile) => {
        cy.visit(
          `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.PREFERENCE}`
        );
      });
    });

    it("can see the preferences tab",() => {
        cy.get("[data-cy=menu]").should("be.visible");
    });
    it("can change data in account page and interact with page",() => {
        cy.get("[data-cy=menu]").contains("Account").click();
        cy.get("[data-cy=req-verif]").click();
        cy.get("[data-cy=submit-btn]").click();
    })
    it("can change data in Notifications Tab",() => {
        cy.get("[data-cy=menu]").contains("Notification").click();
    })
  })