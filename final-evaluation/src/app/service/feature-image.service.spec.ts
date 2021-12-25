import { TestBed } from '@angular/core/testing';

import { FeatureImageService } from './feature-image.service';

describe('FeatureImageService', () => {
  let service: FeatureImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
