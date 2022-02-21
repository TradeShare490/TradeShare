describe("On the following page, can", () => {
  it("search for user", () => {
    cy.login();
    cy.wait(5000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.FOLLOWING}`
      );
    });
    // cy.get("[data-cy=search]")
    //   .click()
    //   .type("mary")
    //   .wait(1000)
    //   .type("{downarrow}")
    //   .type("{enter}");
    // cy.get("[data-cy=search]").should("have.value", "Mary Winchester");
  });
});
