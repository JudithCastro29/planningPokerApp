import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEnMesaCarta } from './usuario-en-mesa-carta';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('UsuarioEnMesaCarta', () => {
  let component: UsuarioEnMesaCarta;
  let fixture: ComponentFixture<UsuarioEnMesaCarta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEnMesaCarta],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioEnMesaCarta);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    component.nombre = 'Lorena';
    component.modo = 'jugador';
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('debería mostrar iniciales si esUsuarioActual = true', () => {
    component.nombre = 'Lorena';
    component.modo = 'jugador';
    component.esUsuarioActual = true;

    component.ngOnChanges({
      nombre: {
        currentValue: 'Lorena',
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
      esUsuarioActual: {
        currentValue: true,
        previousValue: false,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    fixture.detectChanges();

    const iniciales = fixture.debugElement.query(By.css('.iniciales'));
    expect(iniciales.nativeElement.textContent.trim()).toBe('LO');
  });

  it('debería aplicar clase sin-carta si el usuario no ha elegido carta', () => {
    component.nombre = 'judith';
    component.modo = 'jugador';
    component.carta = null;
    component.mostrarCartas = true;
    component.esUsuarioActual = false;
    fixture.detectChanges();
  });

  it('debería mostar el nombre del usuario', () => {
    component.nombre = 'luis';
    fixture.detectChanges();
    const nombre = fixture.debugElement.query(By.css('.nombre'));
    expect(nombre.nativeElement.textContent.trim()).toBe('luis');
  });

  it('debería aplicar la clase oculta si hay carta, pero mostrarCartas=false', () => {
    component.nombre = 'maria';
    component.modo = 'jugador';
    component.carta = '5';
    component.mostrarCartas = false;
    component.esUsuarioActual = false;
    fixture.detectChanges();

    const carta = fixture.debugElement.query(By.css('.carta'));
    expect(carta.nativeElement.classList).toContain('oculta');
  });

  it('debería aplicar  .revelada si eleigieron cartas y mostrarCartas=true', () => {
    component.nombre = 'lorena';
    component.modo = 'jugador';
    component.carta = '13';
    component.mostrarCartas = true;
    component.esUsuarioActual = false;
    fixture.detectChanges();

    const carta = fixture.debugElement.query(By.css('.carta'));
    expect(carta.nativeElement.classList).toContain('revelada');
  });
  it('debería aplicar .espectador si el modo es espectador', () => {
    component.nombre = 'juan';
    component.modo = 'espectador';
    component.mostrarCartas = true;
    component.esUsuarioActual = false;
    fixture.detectChanges();

    const carta = fixture.debugElement.query(By.css('.carta'));
    expect(carta.nativeElement.classList).toContain('espectador');
  });
});
