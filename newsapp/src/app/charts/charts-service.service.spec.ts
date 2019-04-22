import { TestBed } from '@angular/core/testing';

import { ChartsService} from './charts-service.service';

describe('ChartsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartsService = TestBed.get(ChartsService);
    expect(service).toBeTruthy();
  });
});
