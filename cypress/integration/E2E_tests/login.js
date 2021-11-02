describe('Login Test', () => {
    it.only('Login', () => {
        cy.visit('http://localhost:8081/login')
        cy.login()
        cy.get("[data-cy=profile]").should('include.text', 'Jane Doe')
    })
})