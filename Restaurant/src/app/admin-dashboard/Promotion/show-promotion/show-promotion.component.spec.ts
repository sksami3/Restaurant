import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPromotionComponent } from './show-promotion.component';

describe('ShowPromotionComponent', () => {
  let component: ShowPromotionComponent;
  let fixture: ComponentFixture<ShowPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
