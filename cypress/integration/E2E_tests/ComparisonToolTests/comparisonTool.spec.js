/* eslint-disable cypress/no-unnecessary-waiting */
describe.only("On comparison page, can", () => {
  it("open the modal", () => {
    cy.login();
    cy.wait(5000);
    cy.get("[data-cy=profile]").should("include.text", "Jane Doe");
    cy.get("[data-cy=profile]").should(()=> {
      expect(localStorage.getItem('user')).not.to.be.null
      cy.log(localStorage.getItem('user'))
    })
    // cy.get("[data-cy=modal-activate]").click();
    // cy.get("[data-cy=modal]").should("be.visible");
  });

  it("see the legend and radio buttons", () => {
    cy.get("[data-cy=profile]").should(()=> {
      expect(localStorage.getItem('user')).not.to.be.null
    })
    cy.get("[data-cy=modal-activate]").click();
    cy.get("[data-cy=modal]").should("be.visible");
    cy.get("[data-cy=legend]").should("have.length", 3);
  });
});