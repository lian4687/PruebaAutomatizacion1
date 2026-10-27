module.exports = {
  default: {
    defaultTimeout: 60000, 
    paths: [
      "test/features/**/*.feature"
    ],
    require: [
      "test/step_definitions/**/*.ts",
      "test/support/**/*.ts"
    ],
    requireModule: [
      "tsx"
    ],
    import: [
      "allure-cucumberjs/reporter"
    ],
    format: [
      "summary"
    ],
    formatOptions: {
      resultsDir: "allure-results"
    }
  }
};
