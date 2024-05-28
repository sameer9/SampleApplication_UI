import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleUserComponent } from './sample-user.component';

describe('SampleUserComponent', () => {
  let component: SampleUserComponent;
  let fixture: ComponentFixture<SampleUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleUserComponent]
    });
    fixture = TestBed.createComponent(SampleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
