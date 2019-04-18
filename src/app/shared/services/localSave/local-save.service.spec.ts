import { TestBed } from '@angular/core/testing';
import { LocalSaveService } from './local-save.service';
import { SerializationService } from '../serialization/serialization.service';

describe('LocalSaveService', () => {
  let service: LocalSaveService;

  beforeEach(() => {
    service = new LocalSaveService(new SerializationService());
    const store = {};

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): String => {
        return store[key] || null;
      },
    );

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (store[key] = <string>value);
      },
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setLocalItem()', () => {
    it('should set an Item', () => {
      service.setLocalItem('Client1', 'Paul Oliva');
      expect(localStorage.getItem('Client1')).toBe('IlBhdWwgT2xpdmEi');
    });
  });

  describe('getLocalItem()', () => {
    it('should get an Item', () => {
      localStorage.setItem('Client1', 'IlBhdWwgT2xpdmEi');
      expect(service.getLocalItem('Client1')).toBe('Paul Oliva');
    });
  });
});
