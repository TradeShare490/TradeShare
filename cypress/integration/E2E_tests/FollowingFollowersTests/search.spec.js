/* eslint-disable cypress/no-unnecessary-waiting */
describe("On the following page, can", () => {
  it("search for user", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.FOLLOWING}`
      );
    });
    cy.wait(2000);
    cy.get("[data-cy=search]")
      .click()
      .type("ken")
    cy.get("[data-cy=search-result]").should("be.visible");
  });
});
