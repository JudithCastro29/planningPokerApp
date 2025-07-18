import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeleccionCartasComponent } from '../../organisms/seleccion-cartas/seleccion-cartas.component';
import { ControlesAdministradorComponent } from '../../organisms/controles-administrador-component/controles-administrador-component';
import { ResumenVotacionComponent } from '../../organisms/resumen-votacion-component/resumen-votacion-component';
import { UsuarioEnMesaCarta } from '../../molecules/usuario-en-mesa-carta/usuario-en-mesa-carta';
import { UsuarioEnMesa } from '../../../models/usuario.model';
import { calcularEstiloJugadorRectangular } from '../../../utils/player-position';

@Component({
  selector: 'app-mesa-votacion-template-component',
  standalone: true,
  imports: [
    CommonModule,
    SeleccionCartasComponent,
    ControlesAdministradorComponent,
    ResumenVotacionComponent,
    UsuarioEnMesaCarta,
  ],
  templateUrl: './mesa-votacion-template.component.html',
  styleUrls: ['./mesa-votacion-template.component.css'],
})
export class MesaVotacionTemplateComponent {
  @Input() usuarioActual!: UsuarioEnMesa;
  @Input() usuariosEnMesa: UsuarioEnMesa[] = [];
  @Input() cartas: string[] = [];
  @Input() cartasReveladas = false;
  @Input() promedio!: number | string;
  @Input() votos: Record<string, number> = {};
  @Input() mostrarResumen = false;
  @Input() animandoConteo = false;
  @Input() reiniciarSeleccion = 0;
  @Input() todosHanVotado = false;
  @Input() esPropietario = false;

  @Output() contarVotosClick = new EventEmitter<void>();
  @Output() seleccionarCarta = new EventEmitter<string>();
  @Output() revelar = new EventEmitter<void>();
  @Output() reiniciar = new EventEmitter<void>();
  @Output() invitar = new EventEmitter<void>();

  getPlayerStyle(index: number): { [key: string]: string } {
    const jugador = this.usuariosEnMesa[index];

    return calcularEstiloJugadorRectangular(
      index,
      this.usuariosEnMesa.length,
      jugador.nombre,
      jugador.rol === 'propietario',
      this.usuariosEnMesa
    );
  }

  mostrarBotonRevelar(): boolean {
    return (
      this.usuariosEnMesa.every(
        (usuario) => usuario.modo === 'espectador' || usuario.carta
      ) && !this.cartasReveladas
    );
  }
  //para el efecto de anillos separados
  getEstiloAnillo(index: number): { [key: string]: string } {
    switch (index) {
      case 0:
        return { 'margin-right': '40px' };
      case 1:
        return { 'margin-right': '0px' };
      case 2:
        return { 'margin-right': '40px' };
      case 3:
        return { 'margin-right': '0px' };
      default:
        return {};
    }
  }
}
