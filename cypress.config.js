const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Minimal spec pattern, keep tests simple
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Default baseUrl can be changed later by you
    baseUrl: 'https://automationpratice.com.br',
    supportFile: 'cypress/support/e2e.js',
  }
})