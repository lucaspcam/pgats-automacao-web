const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    openMode: 0,
    runMode: 2
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Automation Exercise - Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportFilename: "AutomationExercise-[datetime]-report",
      overwrite: false,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Evento para screenshots em caso de falha
      on('task', {
        failed: require('cypress-mochawesome-reporter/lib').failed,
      });
    },
    screenshotOnRunFailure: true,
    video: true
  },
});
