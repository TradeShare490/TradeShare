describe("On the Sign Up page, ", () => {
  beforeEach(() => {
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.SIGN_UP}`
      );
    });
  });
  it("can't sign up with empty fields", () => {
    cy.get("[data-cy=signup-button]").click();
    cy.signupVerify("[data-cy=first-name]");
    cy.signupVerify("[data-cy=last-name]");
    cy.signupVerify("[data-cy=email]");
    cy.signupVerify("[data-cy=password]");
    cy.signupVerify("[data-cy=password-confirm]");
  });
  it("can't sign up with invalid email", () => {
    cy.signup("John", "Doe", "johndoe@gmail", "test123!", "test123!");
    cy.signupVerify("[data-cy=email]", "E-mail must be valid");
  });
  it("can't sign up with invalid password", () => {
    cy.signup("John", "Doe", "johndoe@gmail.com", "!", "!");
    cy.signupVerify("[data-cy=password]", "Min 8 characters");
    cy.signupVerify("[data-cy=password-confirm]", "Min 8 characters");
  });
  it("can't sign up with mismatching password", () => {
    cy.signup("John", "Doe", "johndoe@gmail.com", "test123!", "testing123!");
    cy.signupVerify("[data-cy=password-confirm]", "Password must match");
  });
  it("can navigate to login page", () => {
    cy.get("[data-cy=login-link]").click();
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.LOGIN}`
      );
    });
  });
});
