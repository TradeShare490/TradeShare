describe('NavBar can', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
    })
    //This test mightg need some work as it's testing something super specific
    it('Redirect you to a Yahoo page',()=>{
        cy.get("[data-cy=autocomplete-search-bar]").should("be.visible");
        cy.get("[data-cy=autocomplete-search-bar]").type("AAPL").should("have.text","AAPL");
        cy.get("[data-cy=autocomplete-list-content]").should("be.visible");
        cy.get("[data-cy=autocomplete-list-item]").should("be.visible");
        cy.get("[data-cy=autocomplete-list-item]").contains("AAPL").click();
    });
    it('Logout', () => {
        cy.get("[data-cy=logout-btn]").click();
        cy.wait(2000);
        cy.get("[data-cy=login-form]").should("be.visible");
    });
})