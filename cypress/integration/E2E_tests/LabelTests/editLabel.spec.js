describe('User Group Label can ', () => {
    var maxGrpNameLen = 10;
    it('edit a group name', () => {
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
            cy.get("[data-cy=user-grp-edit-tf]").should('have.value', 'Family');
            cy.get('[data-cy=user-grp-edit-tf]')
                .clear()
                .type('Edited Grp')
                .should('have.value', 'Edited Grp');
            cy.get('[data-cy=user-grp-edit-submit]').click();
            cy.get("[data-cy=Edited-Grp-label]").should('exist');
            cy.get("[data-cy=user-grp-snackbar]").contains("Group updated", { matchCase: false });
        });
    });
    it('edit a group name no more than max lenght', () => {
        cy.get("body").then(() => {
            cy.get("[data-cy=School-label]").should('exist');
            cy.get('[data-cy=School-edit]').click();
            cy.get("[data-cy=user-grp-edit-tf]").should('have.value', 'School');
            var name = 'I am a very long group name';
            cy.get('[data-cy=user-grp-edit-tf]')
                .clear()
                .type(name)
                .should('have.value', "I am a ver");
            cy.get('[data-cy=user-grp-edit-submit]').click();
            cy.get("[data-cy=I-am-a-ver-label]").should('exist');
            cy.get("[data-cy=user-grp-snackbar]").contains("Group updated", { matchCase: false });
        });
    });
    it('not give an empty group name', () => {
        cy.get("body").then(() => {
            cy.get("[data-cy=Friend-label]").should('exist');
            cy.get('[data-cy=Friend-edit]').click();
            cy.get("[data-cy=user-grp-edit-tf]").should('have.value', 'Friend');
            cy.get('[data-cy=user-grp-edit-tf]').clear();
            cy.get('[data-cy=user-grp-edit-submit]').click();
            cy.get("[data-cy=user-grp-snackbar]").contains("Empty group name", { matchCase: false });
            cy.get("[data-cy=Friend-label]").should('exist');
        });
    });
});