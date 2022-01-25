describe("Brokerage SignUp can", () => {
  before(() => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${
          jsonFile.BROKERAGE_SIGNUP
        }`
      );
    });
  });
  it("Visible", () => {
    cy.get("[data-cy=brokerage-form]").should("be.visible");
  });
  it("Change dropdown", () => {
    cy.get(".v-select__selection").should("have.text", "Alpaca")
      .parent()
      .click();
    cy.get(".v-list-item")
      .contains("Alpaca")
      .click();
    cy.get(".v-select__selection").should("have.text", "Alpaca");
  });
});
