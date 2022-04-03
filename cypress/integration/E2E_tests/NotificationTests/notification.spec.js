describe('the notificationBlock ', () => {
    before(() => {
        cy.login();
        cy.wait(2000);
    })
    //This test might need some work as it's testing something super specific
    it('can open an interact with notification',()=>{
        cy.get("[data-cy=notif-bell]").should("be.visible").click();
        cy.get("[data-cy=notif-list-item]").should("be.visible");
        cy.get("[data-cy=notif-date]").should("be.visible");
        cy.get("[data-cy=notif-list-item]").first().should("be.visible").click();
    });
})