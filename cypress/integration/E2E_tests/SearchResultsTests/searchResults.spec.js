/* eslint-disable cypress/no-unnecessary-waiting */
describe("Can", () => {
  it("see search results", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}`
      );
    });
    cy.get("[data-cy=autocomplete-search-bar").type("nv {enter}");
    cy.url().should("contains", 'search/keyword=nv?');
    cy.get("[data-cy=keyword]").should("contain", "Search result: nv");
  });
  it("see stocks", () => {
    cy.get("[data-cy=logo]").should("be.visible");
    cy.get("[data-cy=nasdaq]").should("be.visible");
    cy.get("[data-cy=stock-name]").should("be.visible");
    cy.get("[data-cy=more-info]").first().click();
  });
  it("see followings and other users", () => {
    if(cy.get("[data-cy=following]").length > 0) {
      cy.get("[data-cy=following]").should("be.visible");
    }
    if(cy.get("[data-cy=follow]").length > 0) {
      cy.get("[data-cy=follow]").should("be.visible");
    }
  })
})