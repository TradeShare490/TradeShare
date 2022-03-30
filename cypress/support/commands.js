import "cypress-localstorage-commands"
Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:8081/login')
    cy.get("[data-cy=email]").type('test@test.com')
    cy.get("[data-cy=password]").type('12345678')
    cy.get("[data-cy=login-button]").click()
    // const user = {
    //     "username": "janedoe",
    //     "alpacaToken": "163e41d9-cccd-490a-8a05-ab473014cdfd",
    //     "userId": "618b2883418c2006690b69be"
    // }
    // cy.setLocalStorage('user', user)

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
Cypress.Commands.add('checkRadioButton', (option) => {
    cy.get("[data-cy=radio-buttons]").check(option, { force: true });
    cy.update();
  });
Cypress.Commands.add('update', () => {
    cy.get("[data-cy=update]").click({ force: true })
  });
Cypress.Commands.add('setDate', (fromOrTo, year, month, day, date) => {
    cy.get("[data-cy=" + fromOrTo + "]").click();
    cy.get("[data-cy=date-picker-" + fromOrTo + "]").should("be.visible");
    cy.get("[data-cy=date-picker-" + fromOrTo + "]").contains(year).click({ force: true });
    cy.get("[data-cy=date-picker-" + fromOrTo + "]").contains(month).click({ force: true });
    cy.get("[data-cy=date-picker-" + fromOrTo + "]").contains(day).click({ force: true });
    cy.get("[data-cy=" + fromOrTo + "]").should("have.value", date);
  });