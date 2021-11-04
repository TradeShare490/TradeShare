describe("On the following page, can", () => {
  it("view by group", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.FOLLOWING}`
      );
    });
    cy.get("[data-cy=sort-label]").click();
    cy.get(".v-list-item")
      .contains("Expert", { matchCase: false })
      .click();
    //click out code
    cy.get("body").click(0, 0);
    cy.get("[data-cy=sort-label]")
      .parent()
      .contains("Expert");
  });
});
