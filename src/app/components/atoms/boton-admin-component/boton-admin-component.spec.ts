import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotonAdminComponent } from './boton-admin-component';
import { Component } from '@angular/core';

describe('BotonAdminComponent', () => {
  let fixture: ComponentFixture<BotonAdminComponent>;
  let component: BotonAdminComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BotonAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener disabled = false por defecto', () => {
    expect(component.disabled).toBe(false);
  });

  it('debería deshabilitar el botón si disabled es true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});

describe('BotonAdminComponent con contenido dentro', () => {
  @Component({
    template: `<app-boton-admin-component
      >Botón Admin</app-boton-admin-component
    >`,
    standalone: true,
    imports: [BotonAdminComponent],
  })
  class ComponentePrueba {}

  let fixture: ComponentFixture<ComponentePrueba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentePrueba],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentePrueba);
    fixture.detectChanges();
  });

  it('debería mostrar el contenido enviado (ng-content)', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Botón Admin');
  });
});
