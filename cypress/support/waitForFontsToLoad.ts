Cypress.Commands.add("waitForFontsToLoad", () => {
  cy.document().its("fonts.status").should("equal", "loaded");
})
