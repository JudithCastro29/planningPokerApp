import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCartasComponent } from './seleccion-cartas.component';

describe('SeleccionCartasComponent', () => {
  let component: SeleccionCartasComponent;
  let fixture: ComponentFixture<SeleccionCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionCartasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
