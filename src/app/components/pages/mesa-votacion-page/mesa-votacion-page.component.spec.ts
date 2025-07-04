import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaVotacionPage } from './mesa-votacion-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../../../state/app.reducers';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MensajeEmergenteService } from '../../../services/mensaje-emergente-service/mensaje-emergente-service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('MesaVotacionPage', () => {
  let component: MesaVotacionPage;
  let fixture: ComponentFixture<MesaVotacionPage>;
  let store: MockStore<AppState>;
  let mensajeEmergenteService: MensajeEmergenteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}), // Reemplaza con tus reducers
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ nombrePartida: 'PartidaTest' }) },
        },
        provideMockStore(),
        MensajeEmergenteService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MesaVotacionPage);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    mensajeEmergenteService = TestBed.inject(MensajeEmergenteService);
    fixture.detectChanges();
  });

  it('debería crear correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar correctamente el nombre de la partida', () => {
    expect(component.nombrePartida).toBe('PartidaTest');
  });

  it('debería agregar un nuevo usuario correctamente', () => {
    const nuevoUsuario = {
      nombre: 'usuario1',
      modo: 'jugador',
      rol: 'jugador',
      partida: 'PartidaTest',
    };

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.guardarUsuario({
      nombre: nuevoUsuario.nombre,
      modo: nuevoUsuario.modo,
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('debería cambiar el modo del usuario actual', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component['usuarioActualSnapshot'] = {
      nombre: 'usuario1',
      modo: 'jugador',
      rol: 'jugador',
      partida: 'PartidaTest',
    };

    component.onCambiarModo();

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: '[Usuarios] Actualizar Modo',
      nombre: 'usuario1',
      modo: 'espectador',
    });
  });

  it('debería revelar cartas al llamar revelarCartas()', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.revelarCartas();

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: '[Cartas] Revelar Cartas',
    });
  });
});
