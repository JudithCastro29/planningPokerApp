import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeEmergenteComponent } from './mensaje-emergente-component';
import { MensajeEmergenteService } from '../../../services/mensaje-emergente-service/mensaje-emergente-service';
import { signal } from '@angular/core';

//mockeando el servicio

class MockMensajeEmergenteService {
  private mensaje = signal('mensaje de prueba');
  private visible = signal(true);

  mensajeActual() {
    return this.mensaje();
  }

  estaVisible() {
    return this.visible();
  }
}
describe('MensajeEmergenteComponent', () => {
  let component: MensajeEmergenteComponent;
  let fixture: ComponentFixture<MensajeEmergenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeEmergenteComponent],
      providers: [
        {
          provide: MensajeEmergenteService,
          useClass: MockMensajeEmergenteService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MensajeEmergenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrarse el msaje desde el service', () => {
    expect(component.mensaje()).toBe('mensaje de prueba');
  });

  it('debería ser visible el mensaje', () => {
    expect(component.visible()).toBe(true);
  });
});
