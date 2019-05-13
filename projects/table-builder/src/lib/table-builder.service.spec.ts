import { TestBed } from '@angular/core/testing';

import { TableBuilderService } from './table-builder.service';

describe('TableBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableBuilderService = TestBed.get(TableBuilderService);
    expect(service).toBeTruthy();
  });
});
