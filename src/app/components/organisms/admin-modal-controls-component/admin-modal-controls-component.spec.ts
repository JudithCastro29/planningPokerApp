import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminModalControlsComponent } from './admin-modal-controls-component';
import { provideStore, Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonDarkComponent } from '../../atoms/button-dark/button-dark.component';
import { delegarPropietario } from '../../../state/usuarios/usuario.actions';
import { establecerModoCartas } from '../../../state/cartas/cartas.actions';

import { Component } from '@angular/core';

describe('AdminModalControlsComponent', () => {
  let component: AdminModalControlsComponent;
  let fixture: ComponentFixture<AdminModalControlsComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminModalControlsComponent,
        FormsModule,
        CommonModule,
        ButtonDarkComponent,
      ],
      providers: [provideStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminModalControlsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    component.usuarioActual = {
      nombre: 'lorena',
      rol: 'propietario',
      modo: 'jugador',
    } as any;
    component.jugadores = [
      { nombre: 'judith', rol: 'jugador', modo: 'jugador' } as any,
      { nombre: 'maria', rol: 'jugador', modo: 'espectador' } as any,
    ];
    component.nombrePartida = 'Partida1';
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir "cerrar" al llamar cerrarModal()', () => {
    const cerrarSpy = jest.spyOn(component.cerrar, 'emit');
    component.cerrarModal();
    expect(cerrarSpy).toHaveBeenCalled();
  });

  it('debería emitir "cambiarModoUsuario" al llamar emitirCambioModo()', () => {
    const modoSpy = jest.spyOn(component.cambiarModoUsuario, 'emit');
    component.emitirCambioModo();
    expect(modoSpy).toHaveBeenCalled();
  });

  it('debería actualizar modoCartas si cambia el input modoActualCartas', () => {
    component.modoActualCartas = 'letras';
    component.ngOnChanges({
      modoActualCartas: {
        previousValue: 'numeros',
        currentValue: 'letras',
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.modoCartas).toBe('letras');
  });

  it('debería despachar delegarPropietario al delegar rol', () => {
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');
    component.jugadorSeleccionado = 'Judith';
    component.delegarRol();
    expect(storeDispatchSpy).toHaveBeenCalledWith(
      delegarPropietario({ actual: 'Lorena', nuevo: 'Judith' })
    );
  });

  it('no debe cambiar modo cartas si cartas están reveladas', () => {
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');
    component.cartasReveladas = true;
    component.modoCartas = 'letras';
    component.cambiarModoCartas();
    expect(storeDispatchSpy).not.toHaveBeenCalled();
  });

  it('debería despachar establecerModoCartas si cartas no están reveladas', () => {
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');
    component.cartasReveladas = false;
    component.modoCartas = 'letras';
    component.cambiarModoCartas();
    expect(storeDispatchSpy).toHaveBeenCalledWith(
      establecerModoCartas({ modo: 'letras', nombrePartida: 'Partida 1' })
    );
  });
});
