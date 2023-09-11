function selectGroupMenuItem(groupName) {
  cy.contains('a', groupName).then((menu) => {
    cy.wrap(menu)
      .find('.expand-state g g')
      .invoke('attr', 'data-name')
      .then((attr) => {
        if (attr.includes('left')) {
          cy.wrap(menu).click({ force: true })
        }
      })
  })
}

export class NavigationPage {
  // Form Pages
  formLayoutsPage() {
    selectGroupMenuItem('Form')
    cy.contains('Form Layouts').click()
  }
  datepickerPage() {
    selectGroupMenuItem('Form')
    cy.contains('Datepicker').click()
  }

  // Modal & Overlay Pages
  modalToastrPage() {
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Toastr').click()
  }
  modalTooltipPage() {
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Tooltip').click()
  }

  //Table & Data Pages
  smartTablePage() {
    selectGroupMenuItem('Tables & Data')
    cy.contains('Smart Table').click()
  }
}

export const navigateTo = new NavigationPage()
