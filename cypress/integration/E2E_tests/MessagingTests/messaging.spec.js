describe("On the messaging page, can", () => {
  before(() => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.MESSAGES}`
      );
    });
  });
  it("select a conversation", () => {
    cy.get("[data-cy=no-messages-window]").should("be.visible");
    cy.get("[data-cy=chat]")
      .first()
      .click();
    cy.get("[data-cy=messages-window]").should("be.visible");
  });
  it("can press the emoji button", () => {
    cy.get("[data-cy=emoji-button]")
      .should("be.visible")
      .click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("You clicked the icon!");
    });
  });
  it("can press the attachment/media button", () => {
    cy.get("[data-cy=image-button]")
      .should("be.visible")
      .click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("You clicked the icon!");
    });
  });
});
