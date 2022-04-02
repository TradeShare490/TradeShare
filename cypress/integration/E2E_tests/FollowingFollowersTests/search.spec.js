/* eslint-disable cypress/no-unnecessary-waiting */
describe("On the following page, can", () => {
  it("search for user", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.FOLLOWING}`
      );
    });
    cy.wait(2000);
    cy.get("[data-cy=following-ReserveForSearch]").should("be.visible");
    cy.get("[data-cy=search]")
      .click()
      .type("Re{enter}")
    cy.wait(2000)
    cy.get("body").then(($body) => {
      cy.get("[data-cy=basic-profile-info]").should("be.visible");
      cy.get("[data-cy=basic-profile-name]").should("be.visible");
      cy.get("[data-cy=basic-profile-name]").should("contain","Reserve ForSearch");
      cy.get("[data-cy=profile-following-ReserveForSearch]").should("be.visible");
      cy.get("[data-cy=profile-num-followers]").should("be.visible");
      cy.get("[data-cy=profile-num-following]").should("be.visible");
      cy.get("[data-cy=sidebar-followings]").should("be.visible");
    })
  });
  it("search for a full user", () => {
    cy.login();
    cy.wait(2000);
    cy.get("[data-cy=sidebar-followings]").click();
    cy.wait(2000);
    cy.get("[data-cy=search]")
      .click()
      .type("John Lee{enter}")
    cy.wait(2000)
    cy.get("body").then(($body) => {
      cy.get("[data-cy=basic-profile-info]").should("be.visible");
      cy.get("[data-cy=basic-profile-name]").should("be.visible");
      cy.get("[data-cy=basic-profile-name]").should("contain","John Lee");
      cy.get("[data-cy=profile-following-zhongli]").should("be.visible");
      cy.get("[data-cy=profile-num-followers]").should("be.visible");
      cy.get("[data-cy=profile-num-following]").should("be.visible");
      cy.get("[data-cy=other-dashboard-recents]").should("be.visible");
      cy.get("[data-cy=other-dashboard-holdings]").should("be.visible");
      cy.get("[data-cy=other-dashboard-positions]").should("be.visible");
      cy.get("[data-cy=other-dashboard-equities]").should("be.visible");
    })
  });
  it("search for a follower", () => {
    cy.login();
    cy.wait(2000);
    cy.get("[data-cy=sidebar-followers]").click();
    cy.wait(2000);
    cy.get("[data-cy=followers-followers-tab]").should("be.visible");
    cy.get("[data-cy=search]")
      .click()
      .type("John Lee{enter}")
    cy.wait(2000)
    cy.get("body").then(($body) => {
      cy.get("[data-cy=basic-profile-info]").should("be.visible");
      cy.get("[data-cy=basic-profile-name]").should("be.visible");
      cy.get("[data-cy=basic-profile-name]").should("contain","John Lee");
    })
  });
});
