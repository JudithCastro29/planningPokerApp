import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDarkComponent } from './button-dark.component';

describe('ButtonDarkComponent', () => {
  let component: ButtonDarkComponent;
  let fixture: ComponentFixture<ButtonDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
