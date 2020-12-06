import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { InitialBillComponent } from './initial-bill.component'

describe('CreateInitialBillDialogComponent', () => {
  let component: InitialBillComponent
  let fixture: ComponentFixture<InitialBillComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InitialBillComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialBillComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
