import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftlistListComponent } from './giftlist-list.component';

describe('GiftlistListComponent', () => {
  let component: GiftlistListComponent;
  let fixture: ComponentFixture<GiftlistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftlistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftlistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
