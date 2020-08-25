import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { UrlShorteningService } from './url-shortening.service';

describe('UrlShorteningService', () => {
  let service: UrlShorteningService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [UrlShorteningService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(UrlShorteningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('shortenUrl() should return a shortened URL', () => {
    const shortUrl = 'https://link.acrabadabra.com/8355d';
    const url = 'https://vimeo.com/256549521';

    httpClientSpy.post.and.returnValue(of({ shortUrl }));

    service.shortenUrl(url).then(
      (value) => expect(value).toEqual(shortUrl),
      fail
    );
  });
});
