describe("On the dashbooard page, Dashboard can", () => {
  before(() => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.DASHBOARD}`
      );
    });
  });
  it("display account summary", () => {
    cy.get("[data-cy=portfolio-value-card]").should("be.visible");
    cy.get("[data-cy=daily-change-card]").should("be.visible");
    cy.get("[data-cy=goal-progress-card]").should("be.visible");
    cy.get("[data-cy=account-performance-card]").should("be.visible");
  });
  it("display recent trades component", () => {
    cy.get("[data-cy=recent-trades-card]").should("be.visible");
  });
  it("display graph", () => {
    cy.get("[data-cy=pie-chart]").should("be.visible");
  });
  it("display bar chart graph", () => {
    cy.get("[data-cy=bar-char-container]").should("be.visible");
  });
  it("display percentages", () => {
    cy.get("[data-cy=holdings-equities-value]").should("be.visible");
    cy.get("[data-cy=holdings-equities-value]").contains(/\d/);
    cy.get("[data-cy=holdings-cash-value]").should("be.visible");
    cy.get("[data-cy=holdings-cash-value]").contains(/\d/);
    cy.get("[data-cy=holdings-options-value]").should("be.visible");
    cy.get("[data-cy=holdings-options-value]").contains(/\d/);
    cy.get("[data-cy=holdings-last-7-days]").should("be.visible");
    cy.get("[data-cy=holdings-breakdown]").should("be.visible");
  });
});
