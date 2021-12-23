Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:8081/login')
    cy.get("[data-cy=email]").type('test@test.com')
    cy.get("[data-cy=password]").type('12345678')
    cy.get("[data-cy=login-button]").click()
  });
Cypress.Commands.add('signup', (firstName, lastName, email, password, passwordConfirm) => {
    cy.get("[data-cy=first-name]").type(firstName);
    cy.get("[data-cy=last-name]").type(lastName);
    cy.get("[data-cy=email]").type(email);
    cy.get("[data-cy=password]").type(password);
    cy.get("[data-cy=password-confirm]").type(passwordConfirm);
    cy.get("[data-cy=signup-button]").click();
  });
Cypress.Commands.add('signupVerify', (object, message="Required") => {
    cy.get(object)
      .parents(".v-input__control")
      .find(".v-messages__message")
      .should("contain.text", message);
  });