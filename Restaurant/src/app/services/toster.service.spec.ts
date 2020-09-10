import { TestBed } from '@angular/core/testing';

import { TosterService } from './toster.service';

describe('TosterService', () => {
  let service: TosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
