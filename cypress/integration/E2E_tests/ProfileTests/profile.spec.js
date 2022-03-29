/* eslint-disable cypress/no-unnecessary-waiting */
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
    cy.wait(3000)
    cy.get("body").then(($body) => {
      if ($body.find("[data-cy=follow]").length > 0) {
        // checking if it is the "follow" button
        cy.get("[data-cy=follow]").click();
        cy.wait(3000); // waiting in case it requires time to update button to "following" button
        cy.get("[data-cy=following]"); // checking that it switched the button to "following"
      } else {
        // this means it was "following" button initially
        cy.get("[data-cy=following]").click();
        cy.wait(3000);
        cy.get("[data-cy=follow]");
      }
    });
  });
  it("send a message", () => {
    cy.get("[data-cy=message]").click();
  });
  it("Display the user data",() =>{
    cy.get("[data-cy=basic-profile-info]").should("be.visible");
    cy.get("[data-cy=profile-num-followers]").should("be.visible");
    cy.get("[data-cy=profile-num-following]").should("be.visible");
  });
});
