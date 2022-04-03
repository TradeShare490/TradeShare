describe("On the support page", () => {
    before(() => {
      cy.login();
      cy.wait(2000);
      cy.fixture("url").then((jsonFile) => {
        cy.visit(
          `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.SUPPORT}`
        );
      });
    });
    it("can be seen", () => {
      cy.get("[data-cy=support-page]").should("be.visible");
    });
    it("Can open the FAQ", () =>{
        cy.get("[data-cy=expansion-panel]").first().should("be.visible").click()
    });
    it("Can send a message", () =>{
        cy.get("[data-cy=help-select]").type("General Inquiries")
        cy.get("[data-cy=message-text]").type("Tails, listen to me, I know who your mother is!")
        cy.get("[data-cy=send-btn]").click()
    });
  });
  