describe('Notification Bar component can', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
        cy.fixture("url").then((jsonFile) => {
            cy.visit(
              `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${jsonFile.FOLLOWERS}`
            );
          });
    })
    it('display the notification and its components', () => {
        cy.get("[data-cy=notif-alert]").should("be.visible");
        cy.get("[data-cy=notif-profile-pic]").should("be.visible");
        cy.get("[data-cy=notif-message]").should("be.visible");
        cy.get("[data-cy=notif-follow-button]").should("be.visible");
    });
    it('react when the follow button is clicked',() => {
        cy.get("[data-cy=notif-follow-button]").click();
        cy.get("[data-cy=notif-unfollow-button]").should("be.visible");
        cy.get("[data-cy=notif-unfollow-button]").click();
        cy.get("[data-cy=notif-follow-button]").should("be.visible");
    })
})