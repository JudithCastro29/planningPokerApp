import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPartidaPageComponent } from './crear-partida-page.component';
import { FormularioCrearPartidaComponent } from '../../organisms/formulario-crear-partida/formulario-crear-partida.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { reiniciarUsuarios } from '../../../state/usuarios/usuario.actions';

import { reiniciarEstado as reiniciarCartasEstado } from '../../../state/cartas/cartas.actions';
import { establecerNombrePartida } from '../../../state/partida/partida.actions';

import { Store } from '@ngrx/store';

describe('CrearPartidaPageComponent', () => {
  let component: CrearPartidaPageComponent;
  let fixture: ComponentFixture<CrearPartidaPageComponent>;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPartidaPageComponent, FormularioCrearPartidaComponent],
      providers: [provideMockStore(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPartidaPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    jest.spyOn(store, 'dispatch');
    jest.spyOn(router, 'navigate');

    fixture.detectChanges();
  });
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería despachar reiniciarUsuarios y reiniciarCartasEstado en ngOnInit', () => {
    expect(store.dispatch).toHaveBeenCalledWith(reiniciarUsuarios());
    expect(store.dispatch).toHaveBeenCalledWith(reiniciarCartasEstado());
  });

  it('debería despachar establecerNombrePartida y navegar al crear una partida hacia otra página', () => {
    const nombrePartida = 'partidaTest';

    component.onPartidaCreada(nombrePartida);

    expect(store.dispatch).toHaveBeenCalledWith(
      establecerNombrePartida({ nombre: nombrePartida })
    );
    expect(router.navigate).toHaveBeenCalledWith([
      '/mesa-votacion',
      nombrePartida,
    ]);
  });
});
