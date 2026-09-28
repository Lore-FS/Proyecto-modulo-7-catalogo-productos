const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    allowCypressEnv: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'http://localhost:8080', // el puerto donde corre tu Vue CLI
    supportFile: false
  }
})