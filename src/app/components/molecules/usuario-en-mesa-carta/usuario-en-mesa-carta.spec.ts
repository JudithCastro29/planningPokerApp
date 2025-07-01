import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEnMesaCarta } from './usuario-en-mesa-carta';

describe('UsuarioEnMesaCarta', () => {
  let component: UsuarioEnMesaCarta;
  let fixture: ComponentFixture<UsuarioEnMesaCarta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEnMesaCarta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioEnMesaCarta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
