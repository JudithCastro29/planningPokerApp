import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDarkComponent } from './button-dark.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

describe('ButtonDarkComponent', () => {
  let component: ButtonDarkComponent;
  let fixture: ComponentFixture<ButtonDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDarkComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonDarkComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener valores por defecto correctos', () => {
    expect(component.tipo).toBe('button');
    expect(component.texto).toBe('Boton');
    expect(component.deshabilitado).toBe(false);
  });

  it('debería desactivar el botón si deshabilitado es true', () => {
    component.deshabilitado = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('debería emitir alguna accion cuando se hace clic cuando no esta deshabilitado', () => {
    jest.spyOn(component.accion, 'emit');
    component.deshabilitado = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.accion.emit).toHaveBeenCalled();
  });

  it('NO deberia emitir alguna accion si esta deshabilitado', () => {
    jest.spyOn(component.accion, 'emit');
    component.deshabilitado = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.accion.emit).not.toHaveBeenCalled();
  });
});
