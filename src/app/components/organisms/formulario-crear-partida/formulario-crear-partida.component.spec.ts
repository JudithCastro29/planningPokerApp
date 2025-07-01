import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearPartidaComponent } from './formulario-crear-partida.component';

describe('FormularioCrearPartidaComponent', () => {
  let component: FormularioCrearPartidaComponent;
  let fixture: ComponentFixture<FormularioCrearPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrearPartidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCrearPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
