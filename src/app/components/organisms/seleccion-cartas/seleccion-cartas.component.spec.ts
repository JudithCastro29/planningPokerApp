import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCartasComponent } from './seleccion-cartas.component';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { UsuarioEnMesa } from '../../../models/usuario.model';

describe('SeleccionCartasComponent', () => {
  let component: SeleccionCartasComponent;
  let fixture: ComponentFixture<SeleccionCartasComponent>;

  const usuarioMock: UsuarioEnMesa = {
    nombre: 'Lorena',
    modo: 'jugador',
    rol: 'jugador',
    partida: 'prueba123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionCartasComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionCartasComponent);
    component = fixture.componentInstance;
    component.cartas = ['1', '2', '3'];
    component.usuarioActual = usuarioMock;
    component.modoUsuario = 'jugador';
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir cartaSeleccionada al hacer clic en una carta si el usuario es jugador', () => {
    jest.spyOn(component.cartaSeleccionada, 'emit');
    const cartaElemento = fixture.debugElement.queryAll(By.css('.carta'))[0];
    cartaElemento.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.cartaSeleccionada.emit).toHaveBeenCalledWith('1');
  });

  it('no debería emitir si ya se seleccionó una carta', () => {
    jest.spyOn(component.cartaSeleccionada, 'emit');
    component.cartaSeleccionadaLocal = '1';
    fixture.detectChanges();

    const cartaElemento = fixture.debugElement.queryAll(By.css('.carta'))[1];
    cartaElemento.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.cartaSeleccionada.emit).not.toHaveBeenCalled();
  });

  it('no debería emitir si el modo es espectador', () => {
    component.usuarioActual = {
      ...usuarioMock,
      modo: 'espectador',
      rol: 'espectador',
    };
    fixture.detectChanges();

    jest.spyOn(component.cartaSeleccionada, 'emit');
    const cartaElemento = fixture.debugElement.queryAll(By.css('.carta'))[0];
    cartaElemento.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.cartaSeleccionada.emit).not.toHaveBeenCalled();
  });
});
