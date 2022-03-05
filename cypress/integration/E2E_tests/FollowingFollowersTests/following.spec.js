/* eslint-disable cypress/no-unnecessary-waiting */
describe("On the following page, can", () => {
  it("unfollow a user", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.FOLLOWING}`
      );
    });
    cy.get("body").then(($body) => {
      cy.wait(3000);
      if ($body.find("[data-cy=following]").length > 0) {
        cy.get("[data-cy=following]").click({ multiple: true });
        cy.get("[data-cy=follow]");
      }
    });
  });
  it("follow a user", () => {
    cy.get("body").then(($body) => {
      cy.wait(3000);
      if ($body.find("[data-cy=follow]").length > 0) {
        cy.get("[data-cy=follow]").click({ multiple: true });
        cy.get("[data-cy=following]");
      }
    });
  });
});
