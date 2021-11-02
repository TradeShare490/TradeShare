Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:8081/login')
    cy.get("[data-cy=email]").type('test@test.com')
    cy.get("[data-cy=password]").type('12345678')
    cy.get("[data-cy=login-button]").click()
  })