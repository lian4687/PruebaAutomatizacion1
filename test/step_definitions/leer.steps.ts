import { When, Then } from '@cucumber/cucumber';
import { Browser, expect } from '@playwright/test';
import {documentoPage} from '../pages/documentosPage';
import { pageFixture } from '../support/pageFixture';

let browser: Browser;


const folio:string='1';
const monto:string='1000';
const rut:string='55.555.555-5'

 


When('Filtro por rut', async function () {
  const documento = new documentoPage(pageFixture.page)
  documento.buscarDocumentoPorRut(rut);
  await expect(pageFixture.page.getByText(/[1-9]\d*\s+documentos?\s+encontrados?/i),'Documento no encontrado').toBeVisible();
});


Then('Valido el detalle', async function () {
  const documento=new documentoPage(pageFixture.page);
  await documento.buscarDocumentoGrilla(folio);
  await expect(pageFixture.page.getByRole('heading', { name: `Detalle DTE - Folio #${folio}` }),'El folio no coincide con el buscado').toBeVisible({ timeout: 30000 });
  await expect(pageFixture.page.getByText('Tipo: DTE 34', { exact: false }),'El tipo de documento no es el correcto').toBeVisible();
  await expect(pageFixture.page.getByText('RUT Receptor: 55.555.555-'),'Rut no encontrado').toBeVisible();
  await expect(pageFixture.page.getByText(/Monto:.*1\.000.*CLP/i),'Monto no encontrado').toBeVisible();
  await expect(pageFixture.page.getByRole('dialog').getByText('Pendiente'),'Estado es diferente al esperado').toBeVisible();
});


