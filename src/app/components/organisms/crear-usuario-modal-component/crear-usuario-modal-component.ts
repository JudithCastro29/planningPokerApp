import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioCrearUsuarioComponent } from '../formulario-crear-usuario/formulario-crear-usuario.component';
@Component({
  selector: 'app-crear-usuario-modal-component',
  standalone: true,
  imports: [CommonModule, FormularioCrearUsuarioComponent],
  templateUrl: './crear-usuario-modal-component.html',
  styleUrl: './crear-usuario-modal-component.css',
})
export class CrearUsuarioModalComponent {
  @Input() nombrePartida: string = '';
  @Output() usuarioCreado = new EventEmitter<{
    nombre: string;
    modo: string;
  }>();
  @Output() cerrar = new EventEmitter<void>();

  manejarUsuarioCreado(usuario: { nombre: string; modo: string }) {
    this.usuarioCreado.emit(usuario);
  }
  cerrarModal() {
    this.cerrar.emit();
  }
}
