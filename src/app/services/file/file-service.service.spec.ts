import { TestBed } from '@angular/core/testing';

import { ExomeFileService } from './file-service.service';

describe('UploadFileServiceService', () => {
  let service: ExomeFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExomeFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
