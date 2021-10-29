import { TestBed } from '@angular/core/testing';

import { GiftResolver } from './gift.resolver';

describe('GiftResolver', () => {
  let resolver: GiftResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GiftResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
