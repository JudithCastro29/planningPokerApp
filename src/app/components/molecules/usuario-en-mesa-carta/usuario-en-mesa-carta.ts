import { CommonModule } from '@angular/common';
import { Component, Input,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-usuario-en-mesa-carta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-en-mesa-carta.html',
  styleUrl: './usuario-en-mesa-carta.css'
})
export class UsuarioEnMesaCarta {
@Input() nombre!: string;
  @Input() modo!: string;
  @Input() carta!: any;
  @Input() mostrarCartas = false;
  @Input() esUsuarioActual: boolean = false;

  iniciales: string = '';

ngOnChanges(changes: SimpleChanges) : void {
 if (changes['nombre'] || changes['esUsuarioActual']){
     this.iniciales = this.nombre?.slice(0, 2).toUpperCase() ?? '';
}

}
}
