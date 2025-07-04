import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearUsuarioModalComponent } from './crear-usuario-modal-component';
import { MockFormularioCrearUsuarioComponent } from './mock-formulario-crear-usuario.component';

describe('CrearUsuarioModalComponent', () => {
  let component: CrearUsuarioModalComponent;
  let fixture: ComponentFixture<CrearUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({})
      .overrideComponent(CrearUsuarioModalComponent, {
        set: {
          imports: [MockFormularioCrearUsuarioComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CrearUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir usuarioCreado al manejarUsuarioCreado()', () => {
    const spy = jest.spyOn(component.usuarioCreado, 'emit');
    component.manejarUsuarioCreado({ nombre: 'lorena', modo: 'jugador' });
    expect(spy).toHaveBeenCalledWith({ nombre: 'lorena', modo: 'jugador' });
  });

  it('debería emitir cerrar al llamar cerrarModal()', () => {
    const spy = jest.spyOn(component.cerrar, 'emit');
    component.cerrarModal();
    expect(spy).toHaveBeenCalled();
  });
});
