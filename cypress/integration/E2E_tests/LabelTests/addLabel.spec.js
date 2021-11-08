describe('User Group Label can ', () => {
    it('not adding a new group', () => {
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
            cy.get("[data-cy=user-grp-list]").contains("Family", { matchCase: true });
            cy.get('[data-cy=create-grp-btn]').click();
            cy.get('[data-cy=create-grp-tf]')
                .type('Going to Cancel');
            cy.get('[data-cy=create-grp-cancel]').click(); 
        });
    });
    it('add a new group', () => {
        cy.get("body").then(() => {
            cy.get('[data-cy=create-grp-btn]').click();
            cy.get('[data-cy=create-grp-tf]')
                .type('New Group')
                .should('have.value', 'New Group');
            cy.get('[data-cy=create-grp-submit]').click();
            cy.get("[data-cy=user-grp-list]").contains("New Group", { matchCase: true });
            cy.get("[data-cy=user-grp-snackbar]").contains("Group Created", { matchCase: true });
        });
    });
    it('add an existed group', () => {
        cy.get("body").then(() => {
            cy.get('[data-cy=create-grp-btn]').click();
            cy.get('[data-cy=create-grp-tf]')
                .type('New Group')
                .should('have.value', 'New Group');
            cy.get('[data-cy=create-grp-submit]').click();
            cy.get("[data-cy=user-grp-snackbar]").contains("New Group already exists", { matchCase: true });
            cy.get('[data-cy=create-grp-cancel]').click(); 
        });
    });
    it('add an empty group', () => {
        cy.get("body").then(() => {
            cy.get('[data-cy=create-grp-btn]').click();
            cy.get('[data-cy=create-grp-tf]')
                .type(' ')
                .should('have.value', ' ');
            cy.get('[data-cy=create-grp-submit]').click();
            cy.get("[data-cy=user-grp-snackbar]").contains("Empty group name", { matchCase: true });
            cy.get('[data-cy=create-grp-cancel]').click(); 
        });
    });
});