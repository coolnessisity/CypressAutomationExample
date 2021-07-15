// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//These two aren't entirely necessary but I feel it gives a better idea of what's going on
Cypress.Commands.add('submitByKeypress', () => {
	cy.get('input[type="number"]').type('{enter}')
})

Cypress.Commands.add('submitByButtonClick', () => {
	cy.get('button[type="submit"]').click()
})

//used to successfully get median
Cypress.Commands.add('getMedian', (enteredNumber) => {
		cy.get('form').within(() => {
			cy.get('input[type="number"]').type(enteredNumber)
			cy.get('input[type="number"]').type('{enter}')
		})
})