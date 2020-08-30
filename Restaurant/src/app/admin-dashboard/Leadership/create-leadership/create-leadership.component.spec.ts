import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadershipComponent } from './create-leadership.component';

describe('CreateLeadershipComponent', () => {
  let component: CreateLeadershipComponent;
  let fixture: ComponentFixture<CreateLeadershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeadershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
