const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    viewportWidth: 1280,  // Set your desired width
    viewportHeight: 720,  // Set your desired height
    baseUrl: "https://www.amazon.in",
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    env: {
      testIsolation: true
    },
    video : false,
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
});

