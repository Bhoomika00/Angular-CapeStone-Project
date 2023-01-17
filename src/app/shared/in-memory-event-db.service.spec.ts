import { TestBed } from '@angular/core/testing';

import { InMemoryEventDbService } from './in-memory-event-db-service.service';

describe('InMemoryEventDbServiceService', () => {
  let service: InMemoryEventDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryEventDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
