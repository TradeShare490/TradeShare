describe("On the messages page, can", () => {
  before(() => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.MESSAGES}`
      );
    });
  });
  it("display no messages at first", () => {
    cy.get("[data-cy=no-messages-window]").should("be.visible");
  });
  it("select a conversation", ()=> {
    cy.get("[data-cy=chat]").click()
    cy.get("[data-cu=messages-window]").should("be.visible");
  })
  it("search for people", () => {
    cy.get("[data-cy=search]").click().type("Jane Doe");
  });
  it("create new chat", () => {
    cy.get("[data-cy=new-message]").click();
  });
  it("can press the emoji button",()=>{
    cy.get("[data-cy=image-button]").should("be.visible").click();
  })
  it("send a message", () => {
    cy.get("[data-cy=send-message]").click().type("Hello");
    cy.get("[data-cy=send-button]").click();
    cy.get("[data-cy=messages-window]").should("include.text", "Hello");
  });
});
