/// <reference types="cypress" />
import { mount } from '@cypress/vue';
import HelloWorld from './HelloWorld.vue';

it('Test Hello World component', () => {
	// with JSX
	mount(() => <HelloWorld msg="Welcome to Your Vue.js App" />);

	cy.get('h1').should('contain', 'Welcome to Your Vue.js App');
});
