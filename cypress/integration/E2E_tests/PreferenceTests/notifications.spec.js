describe("Can", () => {
    it("open the preference tab", () => {
      cy.login();
      cy.wait(2000);
      cy.fixture("url").then((jsonFile) => {
        cy.visit(
          `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.PREFERENCENOT}`
        );
      });
    });

    it("can see the preferences tab",() => {
        cy.get("[data-cy=menu]").should("be.visible");
    });
    it("can change data in Notifications Tab",() => {
      cy.get("[data-cy=menu]").contains("Notifications").should("be.visible");
      cy.get("[data-cy=notif-page]").should("be.visible")
  });
  })