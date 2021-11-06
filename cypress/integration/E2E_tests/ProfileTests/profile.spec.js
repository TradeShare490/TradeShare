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
      if ($body.find("[data-cy=follow]").length > 0) {
        // checking if it is the "follow" button
        assert.equal($body.find("[data-cy=label]").length, 0); // checking there is no label
        cy.get("[data-cy=follow]").click();
        cy.wait(1000); // waiting in case it requires time to update button to "following" button
        cy.get("[data-cy=following"); // checking that it switched the button to "following"
        cy.get("[data-cy=label]").contains("Untagged", { matchCase: false }); // checking "Untagged" label appeared
      } else {
        // this means it was "following" button initially
        assert.equal($body.find("[data-cy=label]").length, 1); // checking that there is a label
        cy.get("[data-cy=following]").click();
        cy.wait(1000);
        cy.get("[data-cy=follow]");
      }
    });
  });
  it("unfollow or follow a user", () => {
    cy.get("body").then(($body) => {
      if ($body.find("[data-cy=following]").length > 0) {
        // checking if it is the "following" button
        assert.equal($body.find("[data-cy=label]").length, 1); // checking that there is a label
        cy.get("[data-cy=following]").click();
        cy.wait(1000); // waiting in case it requires time to update button to "follow" button
        cy.get("[data-cy=follow]"); // checking that it switched the button to "follow"
      } else {
        // this means it was "follow" button initially
        assert.equal($body.find("[data-cy=label]").length, 0);
        cy.get("[data-cy=follow]").click();
        cy.wait(1000);
        cy.get("[data-cy=following]");
        cy.get("[data-cy=label]").contains("Untagged", { matchCase: false }); // checking "Untagged" label appeared
      }
    });
  });
  it("set a label", () => {
    cy.get("body").then(($body) => {
      if ($body.find("[data-cy=following]").length > 0) {
        cy.get("[data-cy=setLabel]").should("not.be.disabled"); // checking that if a user is following the user, can set label
        cy.get("[data-cy=setLabel]").click();
      } else {
        cy.get("[data-cy=setLabel]").should("be.disabled"); // checking that if user is not following user, can't set label
      }
    });
  });
  it("send a message", () => {
    cy.get("[data-cy=message]").click();
  });
});
