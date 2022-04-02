describe("On the dashboard page, Dashboard can", () => {
  before(() => {
    cy.login();
    cy.wait(5000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.DASHBOARD}`
      );
    });
  });
  it('See the pi chart holdings', ()=>{
    cy.get("[data-cy=holdings-pi-chart]").should("be.visible")
    cy.get("[data-cy=line-chart-db]").should("be.visible")
    cy.get("[data-cy=chart-day]").click()
    cy.get("[data-cy=chart-month]").click()
    cy.get("[data-cy=chart-year]").click()
    cy.get("[data-cy=chart-total]").click()
    cy.get("[data-cy=daily-change-card").should("be.visible")
    cy.get("[data-cy=portfolio-value-card").should("be.visible")
    cy.get("[data-cy=account-age-db]").should("be.visible")
    cy.get("[data-cy=compare-db]").click()
  });
});
