describe('Demo test can', () => {
	it('load homepage', () => {
		cy.fixture('url').then((jsonFile) => {
			cy.visit(jsonFile.HOMEPAGE);
		});
	});

	it('test connection to the hosted backend', () => {
		cy.fixture('url').then((jsonFile) => {
			cy.visit(jsonFile.HOSTED_BACKEND_URL);
			cy.get('h1').should('contain', 'API RUNNING!');
		});
	});
});
