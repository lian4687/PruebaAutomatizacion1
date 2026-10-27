import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import {loginPage} from '../pages/loginPage';
import {documentoPage} from '../pages/documentosPage';
import {pageFixture} from '../support/pageFixture';

setDefaultTimeout(60 * 1000); 

const folio:string='1';
const monto:string='1000';
const usuario:string='admin@azurian.com';
const contrasena:string='Azurian2026!';
const rut:string='55.555.555-5'
 


Given('el usuario ha iniciado sesión y se encuentra en el dashboard', async function () {
  const login = new loginPage(pageFixture.page)
  await login.irALogin();
  await login.iniciarSesion(usuario,contrasena);
  await expect(pageFixture.page.getByRole('button', { name: 'Nuevo documento' }), 'boton no encontrado').toBeVisible();
  await expect(pageFixture.page, 'El dashboard no fue encontrado o la redirección falló').toHaveURL(/.*dashboard/);
  
});


When('el usuario crea un nuevo documento con los datos obligatorios', async function(){
  const documento = new documentoPage(pageFixture.page)
  await documento.emitirDocumento(folio,rut,monto);
  await expect(pageFixture.page.locator('tr').filter({ hasText: `#${folio}` }).getByText('Pendiente'), 'documento no esta aceptado').toBeVisible({ timeout: 30000 });
});


Then ('valido creacion del documento', async function(){
  const documento = new documentoPage(pageFixture.page)
  await documento.validarEmisionExitosa(folio,rut);
});

