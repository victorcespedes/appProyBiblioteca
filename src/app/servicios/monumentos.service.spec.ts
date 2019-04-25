import { TestBed } from '@angular/core/testing';

import { MonumentosService } from './monumentos.service';

describe('MonumentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonumentosService = TestBed.get(MonumentosService);
    expect(service).toBeTruthy();
  });
});
