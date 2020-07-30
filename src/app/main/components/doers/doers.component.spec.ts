import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoersComponent } from './doers.component';

describe('DoersComponent', () => {
  let component: DoersComponent;
  let fixture: ComponentFixture<DoersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
