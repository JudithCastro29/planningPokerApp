import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesAdministradorComponent } from './controles-administrador-component';
import { By } from '@angular/platform-browser';
import { BotonAdminComponent } from '../../atoms/boton-admin-component/boton-admin-component';

describe('ControlesAdministradorComponent', () => {
  let component: ControlesAdministradorComponent;
  let fixture: ComponentFixture<ControlesAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlesAdministradorComponent, BotonAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlesAdministradorComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería verse el botón "Nueva votación" si cartasReveladas=true y se ha ejecutado la animación', () => {
    component.cartasReveladas = true;
    component.animandoConteo = false;
    fixture.detectChanges();

    const boton = fixture.debugElement.query(
      By.css('app-boton-admin-component')
    );
    expect(boton.nativeElement.textContent).toContain('Nueva votación');
  });

  it('debería verse el botón "Revelar cartas" si todos han votado', () => {
    component.cartasReveladas = false;
    component.todosHanVotado = true;
    component.animandoConteo = false;
    fixture.detectChanges();

    const boton = fixture.debugElement.query(
      By.css('app-boton-admin-component')
    );
    expect(boton.nativeElement.textContent).toContain('Revelar cartas');
  });

  it('debería verse el botn "Contar votos" las cartas fueron reveladas, con este boón aún no se activa el botón de contar botos ni mostrar el resumen', () => {
    component.esPropietario = true;
    component.cartasReveladas = true;
    component.mostrarResumen = false;
    component.animandoConteo = false;
    fixture.detectChanges();

    const botones = fixture.debugElement.queryAll(
      By.css('app-boton-admin-component')
    );
    const botonContar = botones.find((b) =>
      b.nativeElement.textContent.includes('Contar votos')
    );
    expect(botonContar).toBeTruthy();
  });

  it('debería emitir revelar cuando se hace clic en el botón', () => {
    component.cartasReveladas = false;
    component.todosHanVotado = true;
    component.animandoConteo = false;

    const spy = jest.spyOn(component.revelar, 'emit');
    fixture.detectChanges();

    const boton = fixture.debugElement.query(
      By.css('app-boton-admin-component')
    );
    boton.triggerEventHandler('click');
    expect(spy).toHaveBeenCalled();
  });

  it('debería emitir reiniciar cuando se hace clic', () => {
    component.cartasReveladas = true;
    component.animandoConteo = false;

    const spy = jest.spyOn(component.reiniciar, 'emit');
    fixture.detectChanges();

    const boton = fixture.debugElement.query(
      By.css('app-boton-admin-component')
    );
    boton.triggerEventHandler('click');
    expect(spy).toHaveBeenCalled();
  });

  it('debería emitir contarVotos cuando se hace clic', () => {
    component.cartasReveladas = true;
    component.mostrarResumen = false;
    component.animandoConteo = false;

    const spy = jest.spyOn(component.contarVotos, 'emit');
    fixture.detectChanges();

    const botones = fixture.debugElement.queryAll(
      By.css('app-boton-admin-component')
    );
    const botonContar = botones.find((b) =>
      b.nativeElement.textContent.includes('Contar votos')
    );
    botonContar?.triggerEventHandler('click');
    expect(spy).toHaveBeenCalled();
  });
});
