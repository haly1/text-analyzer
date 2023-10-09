import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {AnalysisMode, TextAnalyzerService} from './text-analyzer.service';
import { environment } from '../../environments/environment';

describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TextAnalyzerService]
    });
    service = TestBed.inject(TextAnalyzerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request', inject(
    [HttpTestingController, TextAnalyzerService],
    (httpMock: HttpTestingController, service: TextAnalyzerService) => {
      /*** given ***/
      const text = 'awesome';
      const mode = AnalysisMode.Vowels;
      const isOfflineModeActive = false;

      /*** when ***/
      service
        .analyzeText(text, mode, isOfflineModeActive)
        .subscribe();

      /*** then ***/
      const req = httpMock.expectOne(`${environment.apiUrl}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ text, mode });
    }
  ));

  it('should analyze text offline', () => {
    /*** given ***/
    const text = 'test OFfliNe';
    const mode = AnalysisMode.Consonants;
    const isOfflineModeActive = true;
    const expectedResult = { t: 2, s: 1, f: 2, l: 1, n: 1 };

    /*** then ***/
    service.analyzeText(text, mode, isOfflineModeActive).subscribe(result => expect(result).toEqual(expectedResult));
  });
});
