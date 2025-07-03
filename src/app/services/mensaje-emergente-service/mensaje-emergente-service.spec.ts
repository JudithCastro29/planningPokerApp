import { TestBed } from '@angular/core/testing';

import { MensajeEmergenteService } from '../mensaje-emergente-service/mensaje-emergente-service';
import { fakeAsync, tick } from '@angular/core/testing';
describe('MensajeEmergenteService', () => {
  let service: MensajeEmergenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new MensajeEmergenteService();
  });

  it('debería mostrar un mensaje y visible = true', () => {
    service.mostrar('Mensaje de prueba1');
    expect(service.mensajeActual()).toBe('Mensaje de prueba1');
    expect(service.estaVisible()).toBe(true);
  });

  it('debería ocultar el mensaje después del tiempo por defecto', fakeAsync(() => {
    service.mostrar('Mensaje temporal');
    expect(service.estaVisible()).toBe(true);

    tick(3000);
    expect(service.estaVisible()).toBe(false);
  }));

  it('debería ocultar el mensaje después del tiempo establecido', fakeAsync(() => {
    service.mostrar('Mensaje prueba2', 5000);
    expect(service.estaVisible()).toBe(true);

    tick(4000);
    expect(service.estaVisible()).toBe(true);

    tick(1000);
    expect(service.estaVisible()).toBe(false);
  }));
});
