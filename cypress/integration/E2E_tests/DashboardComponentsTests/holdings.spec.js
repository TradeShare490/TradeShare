describe("On the dashboard page, Dashboard can", () => {
  before(() => {
    cy.login();
    cy.wait(5000);
  });
  it.skip("display account summary", () => {
    cy.get("[data-cy=portfolio-value-card]").should("be.visible");
    cy.get("[data-cy=daily-change-card]").should("be.visible");
    cy.get("[data-cy=goal-progress-card]").should("be.visible");
    cy.get("[data-cy=account-performance-card]").should("be.visible");
  });
  it.skip("display recent trades component", () => {
    cy.get("[data-cy=recent-trades-card]").should("be.visible");
  });
  it.skip("display graph", () => {
    cy.get("[data-cy=pie-chart]").should("be.visible");
  });
  it.skip("display line chart graph", () => {
    cy.get("[data-cy=line-chart-container]").should("be.visible");
  });
  it.skip("display percentages", () => {
    cy.get("[data-cy=holdings-equities-value]").should("be.visible");
    cy.get("[data-cy=holdings-equities-value]").contains(/\d/);
    cy.get("[data-cy=holdings-cash-value]").should("be.visible");
    cy.get("[data-cy=holdings-cash-value]").contains(/\d/);
    cy.get("[data-cy=holdings-options-value]").should("be.visible");
    cy.get("[data-cy=holdings-options-value]").contains(/\d/);
  });
});
