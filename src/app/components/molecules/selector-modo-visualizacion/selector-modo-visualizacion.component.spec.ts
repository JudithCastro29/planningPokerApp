import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectorModoVisualizacionComponent } from './selector-modo-visualizacion.component';
import { By } from '@angular/platform-browser';

describe('SelectorModoVisualizacionComponent', () => {
  let component: SelectorModoVisualizacionComponent;
  let fixture: ComponentFixture<SelectorModoVisualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorModoVisualizacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorModoVisualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostar para elegir entre "jugador" y "espectador"', () => {
    const labels = fixture.debugElement.queryAll(By.css('label'));
    expect(labels.length).toBe(2);
    expect(labels[0].nativeElement.textContent.toLowerCase()).toContain(
      'jugador'
    );
    expect(labels[1].nativeElement.textContent.toLowerCase()).toContain(
      'espectador'
    );
  });

  it('debería actualizar el modo al seleccionar una opción', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
    const espectadorRadio = inputs[1].nativeElement;
    //ejemplo con espectador
    espectadorRadio.click();
    fixture.detectChanges();

    expect(component.value).toBe('espectador');
  });

  it('debería llamar a onChange y onTouched al seleccionar una opción', () => {
    // se llaman? con que modo o valo ?
    const onChangeSpy = jest.fn();
    const onTouchedSpy = jest.fn();

    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    const inputs = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
    const espectadorRadio = inputs[1].nativeElement;

    espectadorRadio.click();
    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith('espectador');
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
