import { TestBed } from '@angular/core/testing';

import { MensajeEmergenteService } from '../mensaje-emergente-service/mensaje-emergente-service';

describe('MensajeEmergenteService', () => {
  let service: MensajeEmergenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajeEmergenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
