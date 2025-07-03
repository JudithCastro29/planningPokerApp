import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputDarkComponent } from './input-dark.component';
import { By } from '@angular/platform-browser';
import { ButtonDarkComponent } from '../button-dark/button-dark.component';

describe('InputDarkComponent', () => {
  let component: InputDarkComponent;
  let fixture: ComponentFixture<InputDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ButtonDarkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDarkComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el label si labelText está definido', () => {
    component.labelText = 'Tu nombre';
    component.inputId = 'nombre';
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('Tu nombre');
  });

  it('no debería mostrar label si labelText es undefined', () => {
    component.labelText = undefined;
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    expect(label).toBeNull();
  });

  it('debería aplicar el placeholder y type correctamente', () => {
    component.placeholder = 'Escribe tu nombre';
    component.type = 'text';
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.attributes['placeholder']).toBe('Escribe tu nombre');
    expect(input.attributes['type']).toBe('text');
  });

  it('debería enlazarse al FormControl correctamente', () => {
    component.control.setValue('Lorena');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.value).toBe('Lorena');
  });
});
