import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { BillComponent } from './bill.component'

describe('BillComponent', () => {
  let component: BillComponent
  let fixture: ComponentFixture<BillComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BillComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BillComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
