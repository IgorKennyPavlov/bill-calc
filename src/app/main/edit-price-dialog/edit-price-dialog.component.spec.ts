import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditPriceDialogComponent } from './edit-price-dialog.component';

describe('EditPriceDialogComponent', () => {
  let component: EditPriceDialogComponent;
  let fixture: ComponentFixture<EditPriceDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPriceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
