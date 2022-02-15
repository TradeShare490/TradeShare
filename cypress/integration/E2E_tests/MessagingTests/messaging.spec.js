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
    cy.get("[data-cy=name]").should("include.text", "John Doe");
    cy.get("[data-cy=username]").should("include.text", "@johndoe");
  });
  it("search for people", () => {
    cy.get("[data-cy=search]")
      .click()
      .type("Jane Doe")
      .type("{enter}");
  });
  it("create new chat", () => {
    cy.get("[data-cy=new-message]").click({ force: true });
    cy.get("[data-cy=chat-user]").click({ force: true }).type("John").type("{enter}")
    cy.get("[data-cy=list-item]").first().click()
    cy.get("[data-cy=next-button]").click()
    cy.get("[data-cy=dialog]").should("not.exist")
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
  it("send a message", () => {
    cy.get("[data-cy=send-message]")
      .click()
      .type("Hello");
    cy.get("[data-cy=send-button]").click();
    cy.get("[data-cy=messages-window]").should("include.text", "Hello");
  });
});
