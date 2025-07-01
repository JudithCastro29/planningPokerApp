import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionInputComponent } from './validacion-input.component';

describe('ValidacionInputComponent', () => {
  let component: ValidacionInputComponent;
  let fixture: ComponentFixture<ValidacionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
