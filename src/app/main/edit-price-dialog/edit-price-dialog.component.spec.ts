import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriceDialogComponent } from './edit-price-dialog.component';

describe('EditPriceDialogComponent', () => {
  let component: EditPriceDialogComponent;
  let fixture: ComponentFixture<EditPriceDialogComponent>;

  beforeEach(async(() => {
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
