import { mount } from '@cypress/vue';
import UserBlock from "./UserBlock.vue"

describe('On the following page, can', () => {
	it('follow a user', () => {
		mount(() => <UserBlock />);
		cy.get("[data-cy=follow]").then($follow => {
      if($follow.is(':visible')) {
        cy.get("[data-cy=follow]").click();
        cy.get("[data-cy=follow]").contains('Following', { matchCase: false});
      }
    })
	});
  it('unfollow a user', () => {
		mount(() => <UserBlock />);
		cy.get("[data-cy=following]").then($following => {
      if($following.is(':visible')) {
        cy.get("[data-cy=following]").click();
        cy.get("[data-cy=following]").contains('Follow', { matchCase: false});
      }
    })
	});
});