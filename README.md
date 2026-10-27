# Proyecto de Automatización con Cucumber

Este repositorio contiene la configuración y los scripts para la ejecución de pruebas automatizadas utilizando Cucumber.

## Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (que incluye `npm`) en tu sistema antes de comenzar.

## Instalación

Para configurar el entorno y descargar las dependencias necesarias, ejecuta el siguiente comando en la terminal desde la raíz de tu proyecto. Esto instalará Cucumber como una dependencia de desarrollo:

```bash
npm install --save-dev @cucumber/cucumber
```

## Ejecución de las Pruebas

Para correr la automatización completa, el proyecto utiliza un archivo de configuración específico. Puedes ejecutar todas las pruebas utilizando el siguiente comando:

```bash
npx cucumber-js --config config/cucumber.js
```
Para correr la automatización con etiquetas utilizar estos comandos:

```bash
npx cucumber-js --config config/cucumber.js --tags "@crear"
npx cucumber-js --config config/cucumber.js --tags "@leer"
npx cucumber-js --config config/cucumber.js --tags "@editar  
npx cucumber-js --config config/cucumber.js --tags "@eliminar"   
```

Para llamar al reporte allure se utiliza el comando:
```bash
npm run allure:serve
```
---
*Nota: Asegúrate de que el archivo `cucumber.js` exista dentro de la carpeta `config/` con las configuraciones adecuadas de tus steps y features.*