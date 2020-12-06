import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { CalcComponent } from './calc.component'

describe('CalcComponent', () => {
  let component: CalcComponent
  let fixture: ComponentFixture<CalcComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CalcComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
