import { TestBed, async } from '@angular/core/testing';

import { SerializerService } from './serializer.service';

import { Base64 } from 'js-base64';

describe('SerializerService', () => {

  let service: SerializerService;

  const testData = 'Test';
  const jsonData = '"Test"';
  const encodedTestData = 'VGVzdA==';

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(SerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should serialize the given data', () => {
    const spy = spyOn(Base64, 'encode')
      .and.returnValue(encodedTestData);
    expect(service.serialize(testData)).toEqual(encodedTestData);
  });

  it('should deserialize the given data', () => {
    const spy = spyOn(Base64, 'decode')
      .and.returnValue(jsonData);
    expect(service.deserialize(encodedTestData)).toEqual(testData);
  });
});
