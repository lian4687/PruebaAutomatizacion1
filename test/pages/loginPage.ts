import { Page, Locator, expect } from '@playwright/test';

export class loginPage {
  readonly page: Page;
  readonly inputUsuario: Locator;
  readonly inputPassword: Locator;
  readonly btnIniciarSesion: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsuario = page.getByRole('textbox', { name: 'Usuario o Correo Electrónico' });
    this.inputPassword = page.getByRole('textbox', { name: 'Contraseña' });
    this.btnIniciarSesion = page.getByRole('button', { name: 'Iniciar Sesión' });
  }

  async irALogin() {
    await this.page.goto('http://localhost:3000/login');
    await expect(this.btnIniciarSesion, 'Botón de login no visible').toBeVisible();
  }

  async iniciarSesion(usuario: string, contrasena: string) {
    await this.inputUsuario.fill(usuario);
    await this.inputPassword.fill(contrasena);
    await this.btnIniciarSesion.click();
  }
}