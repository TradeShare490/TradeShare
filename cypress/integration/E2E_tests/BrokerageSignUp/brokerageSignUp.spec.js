describe('Brokerage SignUp can', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
        cy.fixture("url").then((jsonFile) => {
            cy.visit(
                `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.BROKERAGE_SIGNUP}`
            );
        });
    });
    it('Visible', () => {
        cy.get("[data-cy=brokerage-form]").should("be.visible");
    });
    it('Enter email', () => {
        cy.get("[data-cy=email-input]")
                .type('test@hotmail.com')
                .should('have.value', 'test@hotmail.com');
    });
})