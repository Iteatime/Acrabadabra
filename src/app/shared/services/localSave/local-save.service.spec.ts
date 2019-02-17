import { TestBed } from '@angular/core/testing';

import { LocalSaveService } from './local-save.service';

describe('LocalSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalSaveService = TestBed.get(LocalSaveService);
    expect(service).toBeTruthy();
  });
});
