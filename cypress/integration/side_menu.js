describe('Side menu can', () => {	
	it('navigate to Home (/news-feed)', () => {
		cy.login();
		cy.wait(5000);
		cy.fixture('url').then((jsonFile) => {
    	cy.visit(`${jsonFile.HOMEPAGE}:${process.env.PORT||8081}${jsonFile.DASHBOARD}`)
		});

		cy.get('[data-cy=user-name]').should('contain', 'Jane Doe')

    cy.contains("Home").click()

		cy.fixture('url').then((jsonFile) => {
			cy.url().should('include',`${jsonFile.FEED}`);
		});
	});
	it('navigate to Dashboard (/dashboard)', () => {
		cy.contains("Dashboard").click()

		cy.fixture('url').then((jsonFile) => {
			cy.url().should('include',`${jsonFile.DASHBOARD}`);
		});
	});
	it('navigate to Followers (/followers)', () => {
		cy.contains("Followers").click()

		cy.fixture('url').then((jsonFile) => {
			cy.url().should('include',`${jsonFile.FOLLOWERS}`);
		});
	});
	it('navigate to Following (/following)', () => {
		cy.contains("Following").click()

		cy.fixture('url').then((jsonFile) => {
			cy.url().should('include',`${jsonFile.FOLLOWING}`);
		});
	});
	it('navigate to Messages (/messages)', () => {
		cy.contains("Messages").click()

		cy.fixture('url').then((jsonFile) => {
			cy.url().should('include',`${jsonFile.MESSAGES}`);
		});
	});
	it('navigate to Preferences (/preferences)', () => {
		cy.contains("Preferences").click()

		cy.fixture('url').then((jsonFile) => {
			cy.url().should('include',`${jsonFile.PREFERENCES}`);
		});
	});
	it('navigate to Icons and Images (/icons-and-images)', () => {
		cy.contains("Icons & Images").click()

		cy.fixture('url').then((jsonFile) => {
			cy.url().should('include',`${jsonFile.ICONS_AND_IMAGES}`);
		});
	});
	it('navigate to Support (/support)', () => {
		cy.contains("Support").click()

		cy.fixture('url').then((jsonFile) => {
			cy.url().should('include',`${jsonFile.SUPPORT}`);
		});
	});
});