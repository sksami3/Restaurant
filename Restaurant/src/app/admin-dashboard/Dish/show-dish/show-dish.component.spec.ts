import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDishComponent } from './show-dish.component';

describe('ShowDishComponent', () => {
  let component: ShowDishComponent;
  let fixture: ComponentFixture<ShowDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
