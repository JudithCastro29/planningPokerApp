import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidacionInputComponent } from './validacion-input.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ValidacionInputComponent', () => {
  let component: ValidacionInputComponent;
  let fixture: ComponentFixture<ValidacionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionInputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidacionInputComponent);
    component = fixture.componentInstance;
  });
  function configurarControl(control: FormControl) {
    control.markAsTouched();
    component.control = control;
    fixture.detectChanges();
  }
  it('no debería mostrar errores si el campo está válido o no se ha tocado', () => {
    component.control = new FormControl('Texto', [Validators.required]);
    fixture.detectChanges();

    const mensaje = fixture.debugElement.query(By.css('.mensaje-error'));
    expect(mensaje).toBeNull();
  });

  it('debería mostrar mensaje de campo requerido', () => {
    const control = new FormControl('', [Validators.required]);
    configurarControl(control);

    const texto = fixture.debugElement.query(By.css('small')).nativeElement
      .textContent;
    expect(texto).toContain('Este campo es obligatorio');
  });

  it('debería mostrar mensaje de minlength', () => {
    const control = new FormControl('a', [Validators.minLength(3)]);
    configurarControl(control);

    const texto = fixture.debugElement.query(By.css('small')).nativeElement
      .textContent;
    expect(texto).toContain('Debe tener al menos');
  });

  it('debería mostrar el mensaje de maxlength', () => {
    const control = new FormControl('123456', [Validators.maxLength(3)]);
    configurarControl(control);

    const texto = fixture.debugElement.query(By.css('small')).nativeElement
      .textContent;
    expect(texto).toContain('No debe superar');
  });

  it('debería mostrar mensajes de errores personalizados', () => {
    const control = new FormControl('');
    control.setErrors({
      caracteresInvalidos: true,
      soloNumeros: true,
      demasiadosNumeros: true,
    });
    configurarControl(control);

    const errores = fixture.debugElement.queryAll(By.css('small'));
    const textos = errores.map((e) => e.nativeElement.textContent.trim());

    expect(textos).toContain('No se permiten caracteres especiales (_,.*#/-)');
    expect(textos).toContain('No puede estar compuesto solo por números');
    expect(textos).toContain('Máximo 3 números permitidos');
  });
});
