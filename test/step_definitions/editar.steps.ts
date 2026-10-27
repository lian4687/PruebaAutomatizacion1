import { When, Then } from '@cucumber/cucumber';
import { Browser, expect } from '@playwright/test';
import {documentoPage} from '../pages/documentosPage';
import { pageFixture } from '../support/pageFixture';

let browser: Browser;

const tipoDocumento:string='34';
const rut:string='55.555.555-5'
const folio:string='1';
const monto:string='2000';

When('el usuario edita un documento', async function(){
    const documento=new documentoPage(pageFixture.page);
    await documento.editarDocumento(folio,rut,tipoDocumento,monto);
    await expect(pageFixture.page.getByText(`Documento folio ${folio} actualizado correctamente.`),'error a editar').toBeVisible();
})
Then('el usuario valida la edicion del documento', async function() {
    await expect(pageFixture.page.getByRole('cell', { name: '$ 2.000 CLP' }),'Monto incorrecto').toBeVisible();
    
}

)