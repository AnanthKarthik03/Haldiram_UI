import { TestBed } from '@angular/core/testing';

import { ExcelService } from './excel.service';

describe('ServiceService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelService);
  });

  it('should be created', () => {
    const service: ExcelService = TestBed.get(ExcelService);
    expect(service).toBeTruthy();
  });
});
