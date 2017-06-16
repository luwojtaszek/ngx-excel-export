import { TestBed, inject } from '@angular/core/testing';

import { ExcelServiceService } from './excel-service.service';

describe('ExcelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelServiceService]
    });
  });

  it('should be created', inject([ExcelServiceService], (service: ExcelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
