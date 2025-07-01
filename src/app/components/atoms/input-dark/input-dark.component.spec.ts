import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDarkComponent } from './input-dark.component';

describe('InputDarkComponent', () => {
  let component: InputDarkComponent;
  let fixture: ComponentFixture<InputDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
