import { TestBed } from '@angular/core/testing';

import { FfioService } from './ffio.service';

describe('FfioService', () => {
  let service: FfioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
