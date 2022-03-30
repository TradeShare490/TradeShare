/* eslint-disable cypress/no-unnecessary-waiting */
describe("On comparison page, can", () => {
  it.skip("open the modal", () => {
    cy.login();
    cy.wait(2000);
    cy.get("[data-cy=modal-activate]").click();
    cy.get("[data-cy=modal]").should("be.visible");
  });

  it.skip("see the legend and radio buttons", () => {
    cy.get("[data-cy=legend]").should("have.length", 3);
  });
});