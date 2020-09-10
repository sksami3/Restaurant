import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLeadershipComponent } from './show-leadership.component';

describe('ShowLeadershipComponent', () => {
  let component: ShowLeadershipComponent;
  let fixture: ComponentFixture<ShowLeadershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLeadershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
