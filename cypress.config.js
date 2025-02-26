const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/', // Your base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Add video recording and screenshot on failure
    video: true,
    screenshotOnRunFailure: true
  },
})