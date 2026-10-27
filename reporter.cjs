// reporter.cjs
let reporterModule;

try {
  // En Allure moderno, el formateador reside en el sub-módulo /reporter
  reporterModule = require("allure-cucumberjs/reporter");
} catch (err) {
  // Fallback para versiones anteriores
  reporterModule = require("allure-cucumberjs");
}

const Formatter =
  (typeof reporterModule === "function" ? reporterModule : null) ||
  (typeof reporterModule?.default === "function" ? reporterModule.default : null) ||
  (typeof reporterModule?.CucumberJSAllureFormatter === "function" ? reporterModule.CucumberJSAllureFormatter : null) ||
  (typeof reporterModule?.AllureCucumber === "function" ? reporterModule.AllureCucumber : null) ||
  (typeof reporterModule?.default?.default === "function" ? reporterModule.default.default : null);

if (!Formatter) {
  console.error("Contenido recibido al importar Allure:", reporterModule);
  throw new Error("No se pudo localizar la clase Formatter en allure-cucumberjs/reporter.");
}

module.exports = Formatter;