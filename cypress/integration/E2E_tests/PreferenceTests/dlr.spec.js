describe("Can", () => {
    it("open the preference tab", () => {
      cy.login();
      cy.wait(2000);
      cy.fixture("url").then((jsonFile) => {
        cy.visit(
          `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.PREFERENCEDLR}`
        );
      });
    });

    it("can see the preferences tab",() => {
        cy.get("[data-cy=menu]").should("be.visible");
    });
    it("can interact with the DLR page",() => {
       // cy.get("[data-cy=region-autocomplete]").type("Canada",{force: true})
        cy.get("[data-cy=save-region-btn]").should("be.visible").click()
        cy.get("data-cy=snack2]").should("be.visible")
        // cy.get("[data-cy=language-autocomplete]").type("French",{force: true})
        cy.get("[data-cy=save-language-btn]").should("be.visible").click()
        cy.get("data-cy=snack1]").should("be.visible")
  })
  })