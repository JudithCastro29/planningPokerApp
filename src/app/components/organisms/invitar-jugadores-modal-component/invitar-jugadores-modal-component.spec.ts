import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitarJugadoresModalComponent } from './invitar-jugadores-modal-component';

describe('InvitarJugadoresModalComponent', () => {
  let component: InvitarJugadoresModalComponent;
  let fixture: ComponentFixture<InvitarJugadoresModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitarJugadoresModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitarJugadoresModalComponent);
    component = fixture.componentInstance;
    component.partida = 'partida123';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('debería emitir cerrar al llamar cerrarModal', () => {
    const spyCerrar = jest.spyOn(component.cerrar, 'emit');
    component.cerrarModal();
    expect(spyCerrar).toHaveBeenCalled();
  });

  it('debería llamar a navigator.clipboard.writeText con la URL correcta al copiarEnlace', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    await component.copiarEnlace();

    expect(writeTextMock).toHaveBeenCalledWith(
      `${window.location.origin}/mesa-votacion/partida123`
    );
  });

  it('obtenerLink debería devolver la URL correcta, usando partida', () => {
    expect(component.obtenerLink()).toBe(
      `${window.location.origin}/mesa-votacion/partida123`
    );
  });
});
