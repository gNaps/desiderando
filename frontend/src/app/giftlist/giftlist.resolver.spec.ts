import { TestBed } from '@angular/core/testing';

import { GiftlistResolver } from './giftlist.resolver';

describe('GiftlistResolver', () => {
  let resolver: GiftlistResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GiftlistResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
