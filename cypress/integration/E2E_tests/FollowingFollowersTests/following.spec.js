/* eslint-disable cypress/no-unnecessary-waiting */
describe("On the following page, can", () => {
  it("unfollow and follow an user", () => {
    cy.login();
    cy.wait(2000);
    cy.fixture("url").then((jsonFile) => {
      cy.visit(
        `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.FOLLOWING}`
      );
    });
    cy.get("body").then((_$body) => {
      cy.wait(3000);
      cy.get("[data-cy=following-ReserveForSearch]").click();
      cy.wait(1000);
      cy.get("[data-cy=follow-ReserveForSearch]").should("be.visible");
      cy.get("[data-cy=follow-ReserveForSearch]").click();
      cy.wait(2000);
      cy.get("[data-cy=following-ReserveForSearch]").should("be.visible");
      cy.get("[data-cy=userblock-avatar-ReserveForSearch]").click()
      cy.wait(2000);
      cy.get("[data-cy=profile-following-ReserveForSearch]").click();
      cy.wait(1000);
      cy.get("[data-cy=profile-follow-ReserveForSearch]").should("be.visible");
      cy.get("[data-cy=profile-follow-ReserveForSearch]").click();
      cy.wait(2000);
      cy.get("[data-cy=profile-following-ReserveForSearch]").should("be.visible");
    });
  });
  it("approve and reject follow request for private account", () => {
    cy.login2();
    cy.unfollowAndFolloeJoeAndLogout()
    cy.login3();
    cy.unfollowAndFolloeJoeAndLogout()
    cy.login();
    cy.wait(2000);
    cy.get("[data-cy=sidebar-followers]").click();
    cy.wait(2000);
    cy.get("[data-cy=followers-follow-requests-tab]").click();
    cy.get("[data-cy=confirm-request-zhongli]").click();
    cy.wait(4000);
    cy.get("[data-cy=followers-follow-requests-tab]").click();
    cy.get("[data-cy=reject-request-ReserveForSearch]").click();
    cy.wait(1000);
    cy.login3();
    cy.unfollowAndFolloeJoeAndLogout()
    cy.login();
    cy.wait(2000);
    cy.get("[data-cy=sidebar-followers]").click();
    cy.wait(2000);
    cy.get("[data-cy=followers-follow-requests-tab]").click();
    cy.get("[data-cy=confirm-request-ReserveForSearch]").click();
  });
});
