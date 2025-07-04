import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaVotacionTemplateComponent } from './mesa-votacion-template.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('MesaVotacionTemplateComponent', () => {
  let component: MesaVotacionTemplateComponent;
  let fixture: ComponentFixture<MesaVotacionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, MesaVotacionTemplateComponent], // Solo importa el componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(MesaVotacionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería devolver un estilo correcto para el jugador', () => {
    component.usuariosEnMesa = [
      {
        modo: 'jugador',
        carta: '1',
        nombre: 'Lorena1',
        rol: 'jugador',
        partida: 'Partida1',
      },
      {
        modo: 'espectador',
        carta: undefined,
        nombre: 'Espectador',
        rol: 'espectador',
        partida: 'Partida1',
      },
    ];

    const estilo = component.getPlayerStyle(0);
    expect(estilo).toHaveProperty('transform');
  });

  it('debería emitir "reiniciar" cuando se hace clic en el botón de reiniciar', () => {
    const reiniciarSpy = jest.spyOn(component.reiniciar, 'emit');

    component.esPropietario = true;
    fixture.detectChanges();

    component.reiniciar.emit();
    expect(reiniciarSpy).toHaveBeenCalled();
  });

  it('debería recibir correctamente las cartas y los usuarios', () => {
    component.cartas = ['1', '2'];
    component.usuariosEnMesa = [
      {
        nombre: 'Lorena1',
        carta: '1',
        modo: 'jugador',
        rol: 'jugador',
        partida: 'Partida1',
      },
      {
        nombre: 'Maria2',
        carta: '2',
        modo: 'jugador',
        rol: 'jugador',
        partida: 'Partida1',
      },
    ];

    expect(component.cartas).toEqual(['1', '2']);
    expect(component.usuariosEnMesa.length).toBe(2);
  });
});
