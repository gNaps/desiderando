import { TestBed } from '@angular/core/testing';

import { ActivityResolver } from './activity.resolver';

describe('ActivityResolver', () => {
  let resolver: ActivityResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ActivityResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
