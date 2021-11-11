describe('NavBar can', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
    })
    it('Logout', () => {
        cy.get("[data-cy=logout-btn]").click();
        cy.wait(2000);
        cy.get("[data-cy=login-form]").should("be.visible");
    });
})