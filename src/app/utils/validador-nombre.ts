import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validarNombre(
  control: AbstractControl
): ValidationErrors | null {
  const valor = control.value ?? '';

  if (!valor) return null;

  if (/[_,.*#\/-]/.test(valor)) return { caracteresInvalidos: true };
  if (/^\d+$/.test(valor)) return { soloNumeros: true };
  if ((valor.match(/\d/g) || []).length > 3) return { demasiadosNumeros: true };

  return null;
}
