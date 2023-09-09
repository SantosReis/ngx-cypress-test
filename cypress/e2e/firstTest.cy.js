/// <reference types="cypress" />

describe('Our first suite', () => {
  it('first test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //by tag name
    cy.get('input')

    //by ID
    cy.get('#inputEmail')

    //by class name
    cy.get('.input-full-width')

    //by attribute name
    cy.get('[placeholder]')

    //by attribute name and value
    cy.get('[placeholder="Email"]')

    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by tag name and attribute with value
    cy.get('input[placeholder="Email"]')

    //by two different attributes
    cy.get('[placeholder="Email"][type="Email"]')

    //by tagname, attribute with value, ID and classname
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

    //The most recommended way by Cypress (build own selector)
    cy.get('[data-cy="imputEmail1"]')
  })
})
