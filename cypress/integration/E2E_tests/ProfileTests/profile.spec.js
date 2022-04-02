/* eslint-disable cypress/no-unnecessary-waiting */
describe("Profile component can ", () => {
  it("follow or unfollow a user", () => {
    cy.login();
    cy.wait(2000);
    cy.intercept('GET', '/api/v1/userInfo/*').as('getOtherInfo')
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${
          jsonFile.OTHER_DASHBOARD
        }`
      );
      cy.wait('@getOtherInfo')
    });
    cy.wait(10000)
    cy.get("body").then(($body) => {
      if ($body.find("[data-cy=follow]").length > 0) {
        cy.intercept('POST', '/api/v1/following/follow').as('followOtherUser')
        // checking if it is the "follow" button
        cy.get("[data-cy=follow]").click();
        // once a request to get settings responds, 'cy.wait' will resolve
        cy.wait('@followOtherUser')
        cy.wait(2000); // waiting in case it requires time to update button to "following" button
        cy.get("[data-cy=following]"); // checking that it switched the button to "following"
      } else {
        cy.intercept('POST', '/api/v1/following/unfollow').as('unfollowOtherUser')
        // this means it was "following" button initially
        cy.get("[data-cy=following]").click();
        // once a request to get settings responds, 'cy.wait' will resolve
        cy.wait('@unfollowOtherUser')
        cy.wait(1000);
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
    cy.get("[data-cy=other-dashboard-recents]").should("be.visible");
    cy.get("[data-cy=other-dashboard-positions]").should("be.visible");
    cy.get("[data-cy=other-dashboard-equities]").should("be.visible");
  });
});
