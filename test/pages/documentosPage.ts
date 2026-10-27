import { Page, Locator, expect } from '@playwright/test';
import { loginPage } from './loginPage';

export class documentoPage {
  readonly page: Page;
  readonly btnNuevoDocumento: Locator;
  readonly btnGuardarYEmitir: Locator;
  readonly inputFolio: Locator;
  readonly inputRut: Locator;
  readonly inputMonto: Locator;
  readonly buscarRut: Locator;
  readonly btnBuscar: Locator;
  readonly tabla:Locator;
  readonly txtMontoTotal:Locator;
  readonly btnGuardar:Locator;
  readonly btnEliminar:Locator;






  constructor(page: Page) {
    this.page = page;
    this.btnNuevoDocumento = page.getByRole('button', {name:'Nuevo documento' });
    this.btnGuardarYEmitir = page.getByRole('button', {name:'Guardar y emitir' });
    this.inputFolio = page.getByPlaceholder('Ej. 1004');
    this.inputRut = page.getByPlaceholder('Ej. 77.341.920-5');
    this.inputMonto = page.getByPlaceholder('Ej. 250000');
    this.buscarRut= page.getByPlaceholder('Buscar por RUT Receptor (ej. 76.192.584-9)...');
    this.btnBuscar=page.getByRole('button', { name: 'Buscar' });
    this.tabla=page.locator('table[aria-label="Tabla de Documentos Tributarios"] tbody tr');
    this.txtMontoTotal=page.getByRole('spinbutton', { name: 'Monto total (CLP) *' });
    this.btnGuardar=page.getByRole('button', { name: 'Guardar cambios' });
    this.btnEliminar=page.getByRole('button', { name: 'Eliminar documento' });

  }

  async verificarEnDashboard() {
    await expect(this.btnNuevoDocumento, 'El botón Nuevo Documento no está visible').toBeVisible();
    await expect(this.page, 'Redirección al dashboard falló').toHaveURL(/.*dashboard/);
  }

  async emitirDocumento(folio: string, rut:string, monto: string) {
    await this.btnNuevoDocumento.click();
    await expect(this.btnGuardarYEmitir,'Error al abrir el formulario de emisión').toBeVisible();
    await this.inputFolio.fill(folio);
    await this.inputRut.fill(rut);
    await this.inputMonto.fill(monto);
    await this.btnGuardarYEmitir.click();
 
  }

  async validarEmisionExitosa(folio: string, rut: string) {
    const fila = this.page.locator('tr').filter({ hasText: `#${folio}` });
    await expect(this.page.locator('td.font-mono').filter({ hasText: '#'+folio }),'no se encuentra el folio del documento').toBeVisible();
    await expect(fila.getByText(/DTE \d+/), 'Tipo DTE incorrecto').toContainText('34');
    await expect(fila.getByText(rut),'RUT no coincide').toBeVisible();
    await expect(fila.getByText(/\$\s*1\.000/), 'Monto no visible o con formato incorrecto').toBeVisible();
    await expect(fila.getByText('Pendiente'), 'Estado no encontrado').toBeVisible();
  }
   async buscarDocumentoPorRut(rut: string) {
    await this.buscarRut.fill(rut);
    await this.btnBuscar.click({ force: true });
  }
  async buscarDocumentoGrilla(folio: string) {
    await this.page.getByRole('button', { name: `Ver detalle de folio ${folio}` }).click();
    await expect(this.page.getByText(`Detalle DTE - Folio #${folio}`)).toBeVisible({timeout:30000});
  }
  async editarDocumento(folio:string, rut:string, tipoDocumento:string, nvoMonto:string){
    await this.buscarDocumentoPorRut(rut);
    await this.page.getByRole('button', { name: `Editar folio ${folio}` }).click();
    console.log('pase,wena')
    await this.txtMontoTotal.click();
    await this.txtMontoTotal.clear();
    await this.txtMontoTotal.fill(nvoMonto);
    await this.btnGuardar.click(); 
  }
  async eliminarDocumento(folio:string){
   await this.page.getByRole('button', { name: `Eliminar folio ${folio}` }).click();
   await this.btnEliminar.click();
  }
}


