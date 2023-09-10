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

  it('Assert property', () => {
    function selectDayFromCurrent(day) {
      let date = new Date()
      date.setDate(date.getDate() + day) //set number of days
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleString('default', { month: 'short' })
      let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

      cy.get('nb-calendar-navigation')
        .invoke('attr', 'ng-reflect-date')
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click()
          }
        })

      return dateAssert
    }

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        cy.wrap(input).click()

        let dateAssert = selectDayFromCurrent(1)
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
      })
  })

  it('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should('be.checked')

        cy.wrap(radioButtons).eq(1).check({ force: true })

        cy.wrap(radioButtons).eq(0).should('not.be.checked')

        cy.wrap(radioButtons).eq(2).should('be.disabled')
      })
  })

  it('Check boxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.get('[type="checkbox"]').eq(0).click({ force: true })
    cy.get('[type="checkbox"]').eq(1).check({ force: true })
  })

  it.only('list and dropdowns', () => {
    cy.visit('/')

    //1
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should(
    //   'have.css',
    //   'background-color',
    //   'rgb(34, 43, 69)'
    // )

    //2
    cy.get('button.select-button').then((dropdown) => {
      cy.wrap(dropdown).click()
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim()
        const colors = {
          Light: 'rgb(255, 255, 255)',
          Dark: 'rgb(34, 43, 69)',
          Cosmic: 'rgb(50, 50, 89)',
          Corporate: 'rgb(255, 255, 255)',
        }
        cy.wrap(listItem).click()
        cy.get(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should(
          'have.css',
          'background-color',
          colors[itemText]
        )
        if (index < 3) {
          cy.wrap(dropdown).click()
        }
      })
    })
  })
})
