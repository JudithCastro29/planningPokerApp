import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPartidaPageComponent } from './crear-partida-page.component';

describe('CrearPartidaPageComponent', () => {
  let component: CrearPartidaPageComponent;
  let fixture: ComponentFixture<CrearPartidaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPartidaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPartidaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
