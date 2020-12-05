import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CounterRecognizerComponent } from './counter-recognizer.component';

describe('CounterRecognizerComponent', () => {
  let component: CounterRecognizerComponent;
  let fixture: ComponentFixture<CounterRecognizerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterRecognizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterRecognizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
