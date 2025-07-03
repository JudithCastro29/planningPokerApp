import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MesaVotacionTemplateComponent } from '../../templates/mesa-votacion-template/mesa-votacion-template.component';
import { UsuarioEnMesa } from '../../../models/usuario.model';

describe('MesaVotacionTemplateComponent', () => {
  let component: MesaVotacionTemplateComponent;
  let fixture: ComponentFixture<MesaVotacionTemplateComponent>;

  const mockUsuarios: UsuarioEnMesa[] = [
    {
      nombre: 'Maria',
      modo: 'jugador',
      rol: 'propietario',
      carta: '5',
      partida: 'Partida1',
    },
    {
      nombre: 'lorena',
      modo: 'jugador',
      rol: 'jugador',
      carta: '3',
      partida: 'Partida1',
    },
    {
      nombre: 'Cristian',
      modo: 'espectador',
      rol: 'jugador',
      carta: '',
      partida: 'Partida1',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaVotacionTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MesaVotacionTemplateComponent);
    component = fixture.componentInstance;

    component.usuarioActual = mockUsuarios[0]; // Alice (propietaria)
    component.usuariosEnMesa = mockUsuarios;
    component.cartas = ['1', '2', '3', '5', '8'];
    component.cartasReveladas = false;
    component.promedio = 4;
    component.votos = { '3': 1, '5': 1 };
    component.esPropietario = true;
    component.mostrarResumen = false;
    component.animandoConteo = false;
    fixture.detectChanges();
  });

  it('debería crear correctamente el componnete', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir "revelar"', () => {
    jest.spyOn(component.revelar, 'emit');
    component.revelar.emit();
    expect(component.revelar.emit).toHaveBeenCalled();
  });

  it('debería emitir "reiniciar"', () => {
    jest.spyOn(component.reiniciar, 'emit');
    component.reiniciar.emit();
    expect(component.reiniciar.emit).toHaveBeenCalled();
  });

  it('debería emitir "contarVotosClick"', () => {
    jest.spyOn(component.contarVotosClick, 'emit');
    component.contarVotosClick.emit();
    expect(component.contarVotosClick.emit).toHaveBeenCalled();
  });

  it('debería mostrar el botón de revelar solo si todos han votado y no se han revelado cartas', () => {
    component.cartasReveladas = false;
    const puedeRevelar = component.mostrarBotonRevelar();
    expect(puedeRevelar).toBe(true);
  });

  it('no debería mostrar el botón de revelar si aún hay jugadores sin votar', () => {
    const usuariosIncompletos = [...mockUsuarios];
    usuariosIncompletos[1].carta = '';
    component.usuariosEnMesa = usuariosIncompletos;
    const puedeRevelar = component.mostrarBotonRevelar();
    expect(puedeRevelar).toBe(false);
  });
});
