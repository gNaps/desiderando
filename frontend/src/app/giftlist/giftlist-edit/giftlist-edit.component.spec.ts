import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftlistEditComponent } from './giftlist-edit.component';

describe('GiftlistEditComponent', () => {
  let component: GiftlistEditComponent;
  let fixture: ComponentFixture<GiftlistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftlistEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftlistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
