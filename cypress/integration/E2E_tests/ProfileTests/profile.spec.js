describe("Profile component can ", () => {
  it("follow or unfollow a user", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${
          jsonFile.OTHER_DASHBOARD
        }`
      );
    });
    cy.get("body").then(($body) => {
      // if ($body.find("[data-cy=follow]").length > 0) {
      //   // checking if it is the "follow" button
      //   cy.get("[data-cy=follow]").click();
      //   cy.wait(1000); // waiting in case it requires time to update button to "following" button
      //   cy.get("[data-cy=following]"); // checking that it switched the button to "following"
      // } else {
      //   // this means it was "following" button initially
      //   cy.get("[data-cy=following]").click();
      //   cy.wait(1000);
      //   cy.get("[data-cy=follow]");
      // }
    });
  });
  it("unfollow or follow a user", () => {
    cy.get("body").then(($body) => {
      // if ($body.find("[data-cy=following]").length > 0) {
      //   // checking if it is the "following" button
      //   cy.get("[data-cy=following]").click();
      //   cy.wait(1000); // waiting in case it requires time to update button to "follow" button
      //   cy.get("[data-cy=follow]"); // checking that it switched the button to "follow"
      // } else {
      //   // this means it was "follow" button initially
      //   cy.get("[data-cy=follow]").click();
      //   cy.wait(1000);
      //   cy.get("[data-cy=following]");
      // }
    });
  });
  it("send a message", () => {
    // cy.get("[data-cy=message]").click();
  });
  it("interact with the user portfolio",()=>{
    //Attempt to add an Invalid Stock
    cy.get("[data-cy=positions-new-item-btn").click();
    cy.get("[data-cy=positions-new-item-submit-btn]").click();
    cy.get("[data-cy=positions-snackbar").should('contain', "Invalid input. Please try again.")
    cy.get("[data-cy=positions-new-item-cancel-btn]").click();
    //Attempt to add a valid stock
    cy.get("[data-cy=positions-new-item-btn").click();
    cy.get("[data-cy=positions-new-item-symbol-tf]").type("TEST_STOCK");
    cy.get("[data-cy=positions-new-item-position-size-tf]").type("{backspace}10");
    cy.get("[data-cy=positions-new-item-submit-btn]").click();
    //To edit that stock
    cy.get("[data-cy=edit-stock-button]").first().click();
    cy.get("[data-cy=positions-new-item-symbol-tf]").clear().type("EDITED_TEST_STOCK");
    cy.get("[data-cy=positions-new-item-position-size-tf]").clear().type("4");
    cy.get("[data-cy=positions-new-item-submit-btn]").click();
    //To share it
    cy.get("[data-cy=share-stock-button]").first().should('be.visible');
    //Then to delete it
    cy.get("[data-cy=delete-stock-button]").last().click();
    cy.get("[data-cy=cancel-stock-delete]").click();
    cy.get("[data-cy=delete-stock-button]").first().click();
    cy.get("[data-cy=confirm-stock-delete]").click();
  });
  it("Display the user data",() =>{
    cy.get("[data-cy=basic-profile-info]").should("be.visible");
    cy.get("[data-cy=profile-num-followers]").should("be.visible");
    cy.get("[data-cy=profile-num-following]").should("be.visible");
  });
});
