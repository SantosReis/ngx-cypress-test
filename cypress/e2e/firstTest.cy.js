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

    //The most recommended way by Cypress (build own selector/locator)
    cy.get('[data-cy="imputEmail1"]')
  })

  it('second test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')
    cy.contains('Sign in')
    cy.contains('[status="warning"]', 'Sign in')

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  })

  it('than and wrap methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //cypress find selector
    /*cy.contains('nb-card', 'Using the Grid')
      .find('[for="inputEmail1"]')
      .should('contain', 'Email')

    cy.contains('nb-card', 'Using the Grid')
      .find('[for="inputPassword2"]')
      .should('contain', 'Password')

    cy.contains('nb-card', 'Basic form')
      .find('[for="exampleInputEmail1"]')
      .should('contain', 'Email address')

    cy.contains('nb-card', 'Basic form')
      .find('[for="exampleInputPassword1"]')
      .should('contain', 'Password')*/

    //jquery find selector and nested selectors
    cy.contains('nb-card', 'Using the Grid').then((firstform) => {
      const emailLabelFirst = firstform.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstform.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then((secondForm) => {
        const passwordSecondText = secondForm
          .find('[for="exampleInputPassword1"]')
          .text()
        expect(passwordLabelFirst).to.equal(passwordSecondText)

        //cypress find selector
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should('contain', 'Password')
      })
    })
  })

  it('Invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2 jquery then
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal('Email address')
    })

    //3 cypress invoke
    cy.get('[for="exampleInputEmail1"]')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Email address')
      })

    //////

    //01
    /*cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked')*/

    //02
    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .then((classValue) => {
        expect(classValue).to.contain('checked')
      })
  })

  it.only('Assert property', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Sep 17, 2023')
      })
  })
})
