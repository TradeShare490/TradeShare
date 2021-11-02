import { mount } from '@cypress/vue';
import SearchViewBy from "./SearchViewBy.vue";

describe('On the following page, can', () => {
	it('search for user', () => {
		mount(() => <SearchViewBy />);
		cy.get('[data-cy]=search').click().type('mary{enter}');
    cy.get('[data-cy]=search').should('have.value', 'Mary Winchester');
	});
});