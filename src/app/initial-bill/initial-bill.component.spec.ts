import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { InitialBillComponent } from './initial-bill.component'

describe('CreateInitialBillDialogComponent', () => {
  let component: InitialBillComponent
  let fixture: ComponentFixture<InitialBillComponent>

  beforeEach(async(() => {
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
