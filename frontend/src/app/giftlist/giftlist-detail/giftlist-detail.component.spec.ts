import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftlistDetailComponent } from './giftlist-detail.component';

describe('GiftlistDetailComponent', () => {
  let component: GiftlistDetailComponent;
  let fixture: ComponentFixture<GiftlistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftlistDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftlistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
