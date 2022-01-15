describe("On the tradezone page, TrendingCompanies component can", () => {
  before(() => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.TRADEZONE}`
      );
    });
  });
  it("display companies", () => {
    cy.get("[data-cy=company-card]").should("be.visible");
  });
});
