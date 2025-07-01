import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenVotacionComponent } from './resumen-votacion-component';

describe('ResumenVotacionComponent', () => {
  let component: ResumenVotacionComponent;
  let fixture: ComponentFixture<ResumenVotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenVotacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenVotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
