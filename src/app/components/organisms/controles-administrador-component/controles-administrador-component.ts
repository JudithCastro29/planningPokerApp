import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonAdminComponent } from '../../atoms/boton-admin-component/boton-admin-component';
@Component({
  selector: 'app-controles-administrador-component',
  standalone: true,
  imports: [CommonModule, BotonAdminComponent],
  templateUrl: './controles-administrador-component.html',
  styleUrls: ['./controles-administrador-component.css'],
})
export class ControlesAdministradorComponent {
  @Input() cartasReveladas = false;
  @Input() todosHanVotado = false;
  @Output() revelar = new EventEmitter<void>();
  @Output() reiniciar = new EventEmitter<void>();
  @Input() animandoConteo: boolean = false;
  @Input() esPropietario: boolean = false;
  @Input() mostrarResumen: boolean = false;
  @Output() contarVotos = new EventEmitter<void>();

  emitirContarVotos() {
    this.contarVotos.emit();
  }
  emitirRevelar() {
    this.revelar.emit();
  }
  emitirReiniciar() {
    this.reiniciar.emit();
  }
}
