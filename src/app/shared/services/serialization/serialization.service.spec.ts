import { SerializationService } from './serialization.service';

describe('SerializationService', () => {
  let service: SerializationService;

  beforeEach(() => {
    service = new SerializationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('serializeObject', () => {
    let test: any;
    beforeEach(() => {
      test = { x: 5, y: 6 };
    });

    it('should serialize an object in a token', () => {
      expect(service.serializeObject(test)).toEqual('eyJ4Ijo1LCJ5Ijo2fQ==');
    });
  });

  describe('deserializeObject', () => {
    let test: any;
    beforeEach(() => {
      test = 'eyJ4Ijo1LCJ5Ijo2fQ==';
    });
    it('should deserialize a base-64 encoded ASCII string to an object', () => {
      expect(service.deserializeObject(test)).toEqual({ x: 5, y: 6 });
    });
  });
});
