const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Amazon Automation Test',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    viewportWidth: 1280,  // Set your desired width
    viewportHeight: 720,  // Set your desired height
    baseUrl: "https://www.amazon.in",
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    env: {
      testIsolation: true
    },
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    videoOnFailOnly: true,
    video: true, // enable video recording
    videoCompression: 32, // video compression to save space (optional)
  },
});

