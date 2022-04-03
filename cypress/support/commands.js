/* eslint-disable cypress/no-unnecessary-waiting */
Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:8081/login')
    cy.get("[data-cy=email]").type('test@test.com')
    cy.get("[data-cy=password]").type('12345678')
    cy.get("[data-cy=login-button]").click()
});
Cypress.Commands.add('loginCustom', (username, pw) => {
  cy.visit('http://localhost:8081/login')
  cy.get("[data-cy=email]").type(username)
  cy.get("[data-cy=password]").type(pw)
  cy.get("[data-cy=login-button]").click()
});
Cypress.Commands.add('unfollowAndFolloeJoeAndLogout', () => {
  cy.wait(2000);
  cy.get("[data-cy=sidebar-followers]").click();
  cy.wait(2000);
  cy.get("body").then(($body) => {
    if ($body.find("[data-cy=following-janedoe]").length > 0) {
      cy.get("[data-cy=following-janedoe]").click();
      cy.wait(1000);
    }
  });
  cy.get("[data-cy=follow-janedoe]").should("be.visible");
  cy.get("[data-cy=follow-janedoe]").click();
  cy.wait(2000);
  cy.get("[data-cy=sent-request-janedoe]").should("be.visible");
  cy.get("[data-cy=logout-btn]").click()
  cy.wait(1000)
})
Cypress.Commands.add('searchForUser', (key, name, username) => {
  cy.get("[data-cy=search]")
      .click()
      .type(`${key}{enter}`)
  cy.wait(2000)
  cy.get("body").then((_$body) => {
    cy.get("[data-cy=basic-profile-info]").should("be.visible");
    cy.get("[data-cy=basic-profile-name]").should("be.visible");
    cy.get("[data-cy=basic-profile-name]").should("contain", username);
    cy.get(`[data-cy=profile-following-${name}]`).should("be.visible");
    cy.get("[data-cy=profile-num-followers]").should("be.visible");
    cy.get("[data-cy=profile-num-following]").should("be.visible");
  })
})
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