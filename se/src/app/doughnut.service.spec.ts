import { TestBed } from '@angular/core/testing';

import { DoughnutService } from './doughnut.service';

describe('DoughnutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoughnutService = TestBed.get(DoughnutService);
    expect(service).toBeTruthy();
  });
});
