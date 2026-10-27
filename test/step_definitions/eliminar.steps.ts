import { When, Then } from '@cucumber/cucumber';
import { Browser, expect } from '@playwright/test';
import {documentoPage} from '../pages/documentosPage';
import { pageFixture } from '../support/pageFixture';

let browser: Browser;


const folio:string='1';
const monto:string='1000';
const rut:string='55.555.555-5'

 


When('el usuario elimina un documento', async function () {
  const documento = new documentoPage(pageFixture.page)
  documento.eliminarDocumento(folio);
  await expect(pageFixture.page.getByText(`Documento folio ${folio} eliminado correctamente.`),'Error al eliminar el documento').toBeVisible();
  

});


Then('el usuario valida la eliminacion del documento', async  ()=> {
  const documento=new documentoPage(pageFixture.page);
  await documento.buscarDocumentoPorRut(rut);
  console.log('pasando');
  await expect(pageFixture.page.getByRole('cell', { name: `#${folio}` }), 'documento aun esta en la tabla').not.toBeVisible({ timeout: 10000 });
});


