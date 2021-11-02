import { mount } from '@cypress/vue';
import SearchViewBy from "./SearchViewBy.vue"

describe('On the following page, can', () => {
	it('view by group', () => {
		mount(() => <SearchViewBy />);
		cy.get('[data-cy=sort-label]').click().select('Expert', { matchCase: false });
		//click out code
		cy.get('body').click(0,0);
		cy.get('[data-cy=sort-label').should('have.value', 'Expert');
	});
});