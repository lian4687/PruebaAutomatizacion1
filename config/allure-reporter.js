const allure = require("allure-cucumberjs");

const Formatter =
  (typeof allure === "function" ? allure : null) ||
  (typeof allure.default === "function" ? allure.default : null) ||
  (typeof allure.CucumberJSAllureFormatter === "function" ? allure.CucumberJSAllureFormatter : null) ||
  (typeof allure.AllureCucumber === "function" ? allure.AllureCucumber : null) ||
  (typeof allure.default?.default === "function" ? allure.default.default : null) ||
  (typeof allure.default?.CucumberJSAllureFormatter === "function" ? allure.default.CucumberJSAllureFormatter : null);

module.exports = Formatter;
