import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { take } from 'rxjs/operators'
import { MainService } from './main.service'
import { IBill } from '../shared/bill/bill.component'
import { getErrorMessage, zeroValidator } from '../shared/validators'
import { EditPriceDialogComponent } from './edit-price-dialog/edit-price-dialog.component'

interface ICounterSchema {
  title: string
  titleClass: string | string[] | Set<string> | { [klass: string]: any }
  formCtrlName: string
  brightness?: number
  contrast?: number
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  countersForm: FormGroup

  prices = {
    coldWaterPrice: 0,
    hotWaterPrice: 0,
    waterUtilizationPrice: 0,
    electricityPrice: 0
  }

  countersSchema: ICounterSchema[] = [
    {
      title: 'Холодная вода',
      titleClass: 'cold-water',
      formCtrlName: 'coldWater'
    },
    {
      title: 'Горячая вода',
      titleClass: 'hot-water',
      formCtrlName: 'hotWater'
    },
    {
      title: 'Эл. энергия',
      titleClass: 'electricity',
      formCtrlName: 'electricity',
      brightness: 1.4,
      contrast: 30
    }
  ]

  get lastBill(): IBill {
    return this._service.lastBill
  }

  set lastBill(newVal) {
    this._service.lastBill = newVal
  }

  get newBill(): IBill {
    return this._service.newBill
  }

  constructor(
    private _fb: FormBuilder,
    private _service: MainService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    // TODO попробовать типизировать через объекты
    this.countersForm = _fb.group({
      coldWater: ['00000', [Validators.required, zeroValidator]],
      hotWater: ['00000', [Validators.required, zeroValidator]],
      electricity: ['00000', [Validators.required, zeroValidator]]
    })

    this.lastBill = this._activatedRoute.snapshot.data.mainResolver
  }

  calculateBill() {
    this._service.calculateBill(
      [...Object.values(this.countersForm.value)].map(i => +i)
    )
  }

  saveNewBill() {
    this._service.saveNewBill()
  }

  clearNewBill() {
    this._service.clearNewBill()
  }

  getErrorMessage(ctrl: AbstractControl): string {
    return getErrorMessage(ctrl)
  }

  openEditPriceDialog() {
    const dialogRef = this._dialog.open(EditPriceDialogComponent)
    // TODO сделать надёжную отписку
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(changesSaved => {
        if (changesSaved) {
          // TODO возможно, лучше сохранять новые значения отдельно, а не перезаписывать данные с сервера. Подумать
          this.lastBill = { ...this._service.lastBill, ...changesSaved }
        }
      })
  }
}
