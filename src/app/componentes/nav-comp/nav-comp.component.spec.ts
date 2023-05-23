import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCompComponent } from './nav-comp.component';

describe('NavCompComponent', () => {
  let component: NavCompComponent;
  let fixture: ComponentFixture<NavCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavCompComponent]
    });
    fixture = TestBed.createComponent(NavCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
