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

  //assertion options to choose
  it('Invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //1 should
    cy.get('[for="exampleInputEmail1"]')
      .should('contain', 'Email address')
      .should('have.class', 'label')
      .and('have.text', 'Email address')

    //2 expect
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal('Email address')
      expect(label).to.have.class('label')
      expect(label).to.have.text('Email address')
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
        //cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert) //invoke assertion way
        cy.wrap(input).should('have.value', dateAssert) //should assertion way
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

  it('list and dropdowns', () => {
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

  it('Web tables', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody')
      .contains('tr', 'Larry')
      .then((tableRow) => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').type('25')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
      })

    //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead')
      .find('tr')
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
        cy.wrap(tableRow).find('.nb-checkmark').click()
      })
    cy.get('tbody tr')
      .first()
      .find('td')
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
        cy.wrap(tableColumns).eq(3).should('contain', 'Bondar')
      })

    //3
    const age = [20, 30, 40]
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should('contain', 'No data found')
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        }
      })
    })
  })

  it('popups and tooltips', function () {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
  })

  it('dialog box', function () {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    // cy.get('tbody tr').first().find('.nb-trash').click()
    // cy.on('window:confirm', (confirm) => {
    //   expect(confirm).to.equal('Are you sure you want to delete?')
    // })

    // 2
    // const stub = cy.stub()
    // cy.on('window:confirm', stub)
    // cy.get('tbody tr')
    //   .first()
    //   .find('.nb-trash')
    //   .click()
    //   .then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith(
    //       'Are you sure you want to delete?'
    //     )
    //   })

    // 3
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => false)
  })
})
