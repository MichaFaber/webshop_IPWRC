import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidPageComponent } from './paid-page.component';

describe('PaidPageComponent', () => {
  let component: PaidPageComponent;
  let fixture: ComponentFixture<PaidPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidPageComponent]
    });
    fixture = TestBed.createComponent(PaidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
