import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalControlsComponent } from './admin-modal-controls-component';

describe('AdminModalControlsComponent', () => {
  let component: AdminModalControlsComponent;
  let fixture: ComponentFixture<AdminModalControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModalControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModalControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
