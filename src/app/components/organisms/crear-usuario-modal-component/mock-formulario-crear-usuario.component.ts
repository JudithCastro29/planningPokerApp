import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formulario-crear-usuario',
  standalone: true,
  template: '',
})
export class MockFormularioCrearUsuarioComponent {
  @Input() nombrePartida!: string;
  @Output() usuarioCreado = new EventEmitter<{
    nombre: string;
    modo: string;
  }>();
  @Output() cerrar = new EventEmitter<void>();
}
