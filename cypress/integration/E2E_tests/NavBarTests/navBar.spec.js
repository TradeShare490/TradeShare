describe('NavBar can', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
    })
    //This test might need some work as it's testing something super specific
    it.skip('Redirect you to a Yahoo page',()=>{
        cy.get("[data-cy=autocomplete-search-bar]").should("be.visible");
        cy.get("[data-cy=autocomplete-search-bar]").type("A");
        cy.get("[data-cy=autocomplete-list-item]").should("be.visible");
        cy.get("[data-cy=autocomplete-list-item]").contains("A: Agilent").click();
    });
    it('search for a user',()=>{
        cy.get("[data-cy=autocomplete-search-bar]").clear().type("@Geo");
        cy.get("[data-cy=autocomplete-name-list]").should('be.visible').click();
        
    });
    it('Logout', () => {
        cy.get("[data-cy=logout-btn]").click();
        cy.wait(2000);
        cy.get("[data-cy=login-form]").should("be.visible");
    });
})