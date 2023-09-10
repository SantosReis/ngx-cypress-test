import { onNavigationPage } from '../support/page_objects/navigationPage'

describe('Tets with Page Object', () => {
  beforeEach('open application', () => {
    cy.visit('/')
  })

  it('verify navigations across the pages ', () => {
    //Forms
    onNavigationPage.formLayoutsPage()
    onNavigationPage.datepickerPage()

    //Modal & Overlays
    onNavigationPage.modalToastrPage()
    onNavigationPage.modalTooltipPage()

    //Tables & Data
    onNavigationPage.smartTablePage()
  })
})
