describe("Login Test", () => {
  it("Login", () => {
    cy.visit("http://localhost:8081/login");
    cy.login();
    cy.wait(2000);
    cy.get("[data-cy=profile]").should("include.text", "Jane Doe");
  });
});