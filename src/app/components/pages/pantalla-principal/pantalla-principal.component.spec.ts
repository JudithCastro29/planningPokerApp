import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { PantallaPrincipal } from './pantalla-principal.component';
import { Router } from '@angular/router';

describe('PantallaPrincipalComponent', () => {
  let component: PantallaPrincipal;
  let fixture: ComponentFixture<PantallaPrincipal>;

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaPrincipal],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallaPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    routerMock.navigate.mockClear();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería redirigir a /crear-partida después de 3 segundos', fakeAsync(() => {
    component.ngOnInit();
    tick(3000);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/crear-partida']);
  }));
});
