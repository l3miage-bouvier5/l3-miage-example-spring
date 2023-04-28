import { TestBed } from '@angular/core/testing';

import { CurrentMiahootService } from './current-miahoot.service';

describe('CurrentMiahootService', () => {
  let service: CurrentMiahootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentMiahootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
