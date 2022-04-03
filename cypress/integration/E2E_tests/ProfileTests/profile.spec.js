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
    cy.wait(2000)
    cy.get("body").then(($body) => {
      cy.log('CHEKING')
      cy.log($body.find("[data-cy=profile-follow-test]").length)
      if ($body.find("[data-cy=profile-follow-test]").length > 0) {
        cy.log('TRUE followed')
        cy.get("[data-cy=profile-follow-test]").click();
        cy.wait(1000); // waiting in case it requires time to update button to "following" button
        cy.get("[data-cy=profile-following-test]").should("be.visible"); // checking that it switched the button to "following"
      } else {
        cy.log('FALSE not follow')
        cy.get("[data-cy=profile-following-test]").click();
        cy.wait(1000);
        cy.get("[data-cy=profile-follow-test]").click();
        cy.wait(1000);
        cy.get("[data-cy=profile-following-test]").should("be.visible");
      }
    });
  });
  it("send a message", () => {
    cy.get("[data-cy=message]").click();
  });
  it("Display the user data", () =>{
    cy.get("[data-cy=basic-profile-info]").should("be.visible");
    cy.get("[data-cy=profile-num-followers]").should("be.visible");
    cy.get("[data-cy=profile-num-following]").should("be.visible");
    cy.get("[data-cy=other-dashboard-recents]").should("be.visible");
    cy.get("[data-cy=other-dashboard-positions]").should("be.visible");
    cy.get("[data-cy=other-dashboard-equities]").should("be.visible");
    cy.get("[data-cy=profile-block]").should("be.visible");
    cy.get("[data-cy=profile-block]").click();
    cy.log("USER BLOCKED")
    cy.wait(2000)
    cy.get("[data-cy=logout-btn]").click()
    cy.wait(1000)
  });
  it("Unblock an user", () => {
    cy.login()
    cy.wait(2000)
    cy.get("[data-cy=sidebar-Preferences]").should("be.visible");
    cy.get("[data-cy=sidebar-Preferences]").click();
    cy.wait(2000)
    cy.get("[data-cy=preference-mdi-security]").should("be.visible");
    cy.get("[data-cy=preference-mdi-security]").click(); 
    cy.wait(500)  
    cy.log("UNBLOCK USER")
    cy.get("[data-cy=unblock-test]").click();
    cy.get("[data-cy=toggle-privacy]").click();
    cy.wait(500)
    cy.get("[data-cy=toggle-privacy]").click();
  })
});
