import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterRecognizerComponent } from './counter-recognizer.component';

describe('CounterRecognizerComponent', () => {
  let component: CounterRecognizerComponent;
  let fixture: ComponentFixture<CounterRecognizerComponent>;

  beforeEach(async(() => {
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
