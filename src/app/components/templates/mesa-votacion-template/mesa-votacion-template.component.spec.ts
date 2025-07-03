import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaVotacionPage } from '../../pages/mesa-votacion-page/mesa-votacion-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../../../state/app.reducers';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MensajeEmergenteService } from '../../../services/mensaje-emergente-service/mensaje-emergente-service';
import { CrearUsuarioModalComponent } from '../../organisms/crear-usuario-modal-component/crear-usuario-modal-component';
import { InvitarJugadoresModalComponent } from '../../organisms/invitar-jugadores-modal-component/invitar-jugadores-modal-component';
import { MesaVotacionTemplateComponent } from '../../templates/mesa-votacion-template/mesa-votacion-template.component';
import { AdminModalControlsComponent } from '../../organisms/admin-modal-controls-component/admin-modal-controls-component';
import { MensajeEmergenteComponent } from '../../molecules/mensaje-emergente-component/mensaje-emergente-component';

describe('MesaVotacionPage', () => {
  let component: MesaVotacionPage;
  let fixture: ComponentFixture<MesaVotacionPage>;
  let store: Store<AppState>;
  let mensajeEmergenteService: MensajeEmergenteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        StoreModule.forRoot({}),
        MesaVotacionPage,
        CrearUsuarioModalComponent,
        InvitarJugadoresModalComponent,
        MesaVotacionTemplateComponent,
        AdminModalControlsComponent,
        MensajeEmergenteComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ nombrePartida: 'Partida1' }),
          },
        },
        MensajeEmergenteService,
        Store,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MesaVotacionPage);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    mensajeEmergenteService = TestBed.inject(MensajeEmergenteService);

    // Usamos jest.spyOn en lugar de spyOn
    jest.spyOn(store, 'select').mockReturnValue(of([])); // Simula que el estado de las cartas y usuarios está vacío
    jest.spyOn(mensajeEmergenteService, 'mostrar').mockImplementation(() => {}); // Es necesario para verificar si se muestra el mensaje

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al método mostrarAdminModal.set al hacer clic en el botón de administrador', () => {
    const button =
      fixture.debugElement.nativeElement.querySelector('.iniciales-boton');
    button.click();
    expect(component.mostrarAdminModal()).toBe(true);
  });
});
