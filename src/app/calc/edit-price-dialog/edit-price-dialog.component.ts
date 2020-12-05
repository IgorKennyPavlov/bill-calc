import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { getErrorMessage, zeroValidator } from 'src/app/shared/validators'
import { CalcService } from '../calc.service'

@Component({
  selector: 'app-edit-price-dialog',
  templateUrl: './edit-price-dialog.component.html',
  styleUrls: ['./edit-price-dialog.component.scss']
})
export class EditPriceDialogComponent {
  priceForm: FormGroup

  priceFormSchema = [
    {
      title: 'Холодная вода',
      formCtrlName: 'coldWaterPrice'
    },
    {
      title: 'Горячая вода',
      formCtrlName: 'hotWaterPrice'
    },
    {
      title: 'Водоотведение',
      formCtrlName: 'waterUtilizationPrice'
    },
    {
      title: 'Эл. энергия',
      formCtrlName: 'electricityPrice'
    }
  ]

  constructor(private _fb: FormBuilder, private _service: CalcService) {
    this.priceForm = _fb.group({
      coldWaterPrice: ['', [Validators.required, zeroValidator]],
      hotWaterPrice: ['', [Validators.required, zeroValidator]],
      waterUtilizationPrice: ['', [Validators.required, zeroValidator]],
      electricityPrice: ['', [Validators.required, zeroValidator]]
    })
    this.priceForm.patchValue(this._service.lastBill)
  }

  getErrorMessage(ctrl: AbstractControl): string {
    return getErrorMessage(ctrl)
  }
}
