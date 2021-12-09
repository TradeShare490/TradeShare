describe("On the dashbooard page, Holdings component can", () => {
  before(() => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.DASHBOARD}`
      );
    });
  });
  it("display graph", () => {
    cy.get("[data-cy=pie-chart]").should("be.visible");
  });
  it("display percentages", () => {
    cy.get("[data-cy=equities-value]").should("be.visible");
    cy.get("[data-cy=cash-value]").should("be.visible");
    cy.get("[data-cy=options-value]").should("be.visible");
  });
});
