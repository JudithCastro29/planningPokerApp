import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaVotacionTemplateComponent } from './mesa-votacion-template.component';

describe('MesaVotacionTemplateComponent', () => {
  let component: MesaVotacionTemplateComponent;
  let fixture: ComponentFixture<MesaVotacionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaVotacionTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesaVotacionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
