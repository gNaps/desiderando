import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftlistCardComponent } from './giftlist-card.component';

describe('GiftlistCardComponent', () => {
  let component: GiftlistCardComponent;
  let fixture: ComponentFixture<GiftlistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftlistCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftlistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
