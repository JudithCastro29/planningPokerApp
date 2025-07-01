import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitarJugadoresModalComponent } from './invitar-jugadores-modal-component';

describe('InvitarJugadoresModalComponent', () => {
  let component: InvitarJugadoresModalComponent;
  let fixture: ComponentFixture<InvitarJugadoresModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitarJugadoresModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitarJugadoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
