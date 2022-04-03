describe("Can", () => {
    it("open the preference tab", () => {
      cy.login();
      cy.wait(2000);
      cy.fixture("url").then((jsonFile) => {
        cy.visit(
          `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.PREFERENCEPNS}`
        );
      });
    });

    it("can see the preferences tab",() => {
        cy.get("[data-cy=menu]").should("be.visible");
    });
    it("can change data in the privacy page",() => {
        cy.get("[data-cy=toggle-privacy]").click()
        cy.get("[data-cy=toggle-privacy]").click()
        cy.get("[data-cy=savePassword-btn]").click()
  });
  })