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
    cy.get("[data-cy=autocomplete-search-bar").type("j{enter}");
    cy.url().should("contains", 'search/keyword=j?');
    cy.get("[data-cy=keyword]").should("contain", "Search result: j");
  });
  it.skip("see stocks", () => {
    cy.get("[data-cy=logo]").should("be.visible");
    cy.get("[data-cy=ticker]").should("be.visible");
    cy.get("[data-cy=stock-name]").should("be.visible");
    cy.get("[data-cy=more-info]").first().click()
  });
  it("see followings and other users", () => {
    cy.get("[data-cy=following-zhongli]").should("be.visible");
    cy.get("[data-cy=follow-jmetertester]").should("be.visible");
  })
})