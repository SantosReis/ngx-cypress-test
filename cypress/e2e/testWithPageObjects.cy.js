import { navigateTo } from '../support/page_objects/navigationPage'
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage'
import { onDatePickerPage } from '../support/page_objects/datepickerPage'
import { onSmartTablePage } from '../support/page_objects/smartTablePage'

describe('Tets with Page Object', () => {
  beforeEach('open application', () => {
    cy.visit('/')
  })

  it('verify navigations across the pages ', () => {
    //Forms
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()

    //Modal & Overlays
    navigateTo.modalToastrPage()
    navigateTo.modalTooltipPage()

    //Tables & Data
    navigateTo.smartTablePage()
  })

  it.only('Submit inline and basic form to select calendar', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormWithNameANdEmail('Artem', 'test@test.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
      'test@test.com',
      'password'
    )

    navigateTo.datepickerPage()
    onDatePickerPage.selectCommonDatepickerDateFromToday(1)
    onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)

    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar')
    onSmartTablePage.updateAgeByFirstName('Artem', '60')
    onSmartTablePage.deleteRowbyIndex(1)
  })
})
