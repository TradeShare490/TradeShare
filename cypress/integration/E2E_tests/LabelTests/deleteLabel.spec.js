describe('User Group Label can ', () => {
    it('not deleting a group', () => {
        cy.login();
        cy.wait(2000); // default 2000
        cy.fixture("url").then((jsonFile) => {
            cy.visit(
                `${jsonFile.HOMEPAGE}:${process.env.PORT || 8081}${
                jsonFile.USER_GROUP_DIALOG_TEMP
                }`
            );
            cy.get('[data-cy=user-grp-dialog-main-btn]').click();
        });
        cy.get("body").then(() => {
            cy.get("[data-cy=Family-label]").should('exist');
            cy.get('[data-cy=Family-edit]').click();
            cy.get('[data-cy=user-grp-edit-delete]').click();
            cy.get('[data-cy=user-grp-edit-delete-cancel]').click();
            cy.get('[data-cy=user-grp-edit-submit]').click();
            cy.get("[data-cy=user-grp-snackbar]").contains("Group updated", { matchCase: false });
        });
    });
    it('deleting a group', () => {
        cy.get("body").then(() => {
            cy.get("[data-cy=Family-label]").should('exist');
            cy.get('[data-cy=Family-edit]').click();
            cy.get('[data-cy=user-grp-edit-delete]').click();
            cy.get('[data-cy=user-grp-edit-delete-delete]').click();
            cy.get("[data-cy=user-grp-snackbar]").contains("Family group deleted", { matchCase: false });
            cy.get("[data-cy=Family-label]").should('not.exist');
        });
    });
    it('try to delete all group', () => {
        cy.get("body").then(() => {
            cy.get("[data-cy=School-label]").should('exist');
            cy.get("[data-cy=Friend-label]").should('exist');
            cy.get('[data-cy=School-edit]').click();
            cy.get('[data-cy=user-grp-edit-delete]').click();
            cy.get('[data-cy=user-grp-edit-delete-delete]').click();
            cy.get('[data-cy=Friend-edit]').click();
            cy.get('[data-cy=user-grp-edit-delete]').click();
            cy.get('[data-cy=user-grp-edit-delete-delete]').click();
            cy.get("[data-cy=user-grp-snackbar]").contains("Keep at least one group", { matchCase: false });
            cy.get("[data-cy=School-label]").should('not.exist');
            cy.get("[data-cy=Friend-label]").should('exist');
        });
    });
});