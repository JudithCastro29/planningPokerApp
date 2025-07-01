import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesAdministradorComponent } from './controles-administrador-component';

describe('ControlesAdministradorComponent', () => {
  let component: ControlesAdministradorComponent;
  let fixture: ComponentFixture<ControlesAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlesAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlesAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
