import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenVotacionComponent } from './resumen-votacion-component';
import { By } from '@angular/platform-browser';
describe('ResumenVotacionComponent', () => {
  let component: ResumenVotacionComponent;
  let fixture: ComponentFixture<ResumenVotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenVotacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenVotacionComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería ordenar las cartas correctamente', () => {
    component.votos = { '5': 2, '1': 1, '3': 3 };
    fixture.detectChanges();
    const cartas = component.cartasOrdenadas();
    expect(cartas).toEqual(['1', '3', '5']);
  });

  it('debería mostrar promedio numérico con 1 decimal', () => {
    component.votos = { '2': 1, '4': 2 };
    component.promedio = 3.333;
    fixture.detectChanges();

    const promedioEl = fixture.debugElement.query(
      By.css('.bloque-promedio strong')
    );
    expect(promedioEl.nativeElement.textContent.trim()).toBe('3.3');
  });

  it('debería mostrar promedio como texto si es string', () => {
    component.promedio = 'No aplica';
    fixture.detectChanges();

    const promedioEl = fixture.debugElement.query(
      By.css('.bloque-promedio strong')
    );
    expect(promedioEl.nativeElement.textContent.trim()).toBe('No aplica');
  });

  it('no debería mostrar promedio si es null', () => {
    component.promedio = null as any;
    fixture.detectChanges();

    const promedioBlock = fixture.debugElement.query(
      By.css('.bloque-promedio')
    );
    expect(promedioBlock).toBeNull();
  });
});
