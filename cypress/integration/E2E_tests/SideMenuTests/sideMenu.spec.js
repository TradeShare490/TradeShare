describe("Side menu can", () => {
  it("navigate to each page", () => {
    cy.login();
    cy.wait(2000);
    cy.get("[data-cy=menu]").each(($a) => {
      const href = $a.prop("href");
      cy.request(href);
    });
  });
});