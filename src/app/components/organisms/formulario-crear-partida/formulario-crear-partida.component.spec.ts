import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormularioCrearPartidaComponent } from './formulario-crear-partida.component';

describe('FormularioCrearPartidaComponent', () => {
  let component: FormularioCrearPartidaComponent;
  let fixture: ComponentFixture<FormularioCrearPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrearPartidaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCrearPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir partidaCreada al dar click en crearPartida con nombre válido', () => {
    jest.spyOn(component.partidaCreada, 'emit');

    component.nombrePartidaControl.setValue('Partida Valida');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.form.valid).toBe(true);
    expect(component.partidaCreada.emit).toHaveBeenCalledWith('Partida Valida');
  });

  it('no debería emitir partidaCreada si el nombre es inválido o esta vacio', () => {
    jest.spyOn(component.partidaCreada, 'emit');

    component.nombrePartidaControl.setValue('123456');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.form.invalid).toBe(true);
    expect(component.partidaCreada.emit).not.toHaveBeenCalled();
  });
});
