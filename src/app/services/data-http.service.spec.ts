import { TestBed, inject } from '@angular/core/testing';

import { DataHttpService } from './data-http.service';

describe('DataHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataHttpService]
    });
  });

  it('should be created', inject([DataHttpService], (service: DataHttpService) => {
    expect(service).toBeTruthy();
  }));
});
