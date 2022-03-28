/* eslint-disable cypress/no-unnecessary-waiting */
describe("On comparison page, can", () => {
  const now = new Date().toISOString().slice(0, 10)
  it("open the modal", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.DASHBOARD}`
      );
    });
    cy.get("[data-cy=modal-activate]").click();
    cy.get("[data-cy=modal]").should("be.visible");
  });

  it("see the legend and radio buttons", () => {
    cy.get("[data-cy=legend]").should("have.length", 3);
    // cy.get("[data-cy=radio-buttons]").should("have.length", 3);
  });
});