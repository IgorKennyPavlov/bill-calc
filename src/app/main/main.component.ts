import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
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

  get newBill(): IBill {
    return this._service.newBill
  }

  constructor(
    private _fb: FormBuilder,
    private _service: MainService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    const { coldWaterCost, hotWaterCost, electricityCost } = this._service.lastBill = this._activatedRoute.snapshot.data.mainResolver

    // TODO попробовать типизировать через объект
    this.countersForm = _fb.group({
      coldWater: _fb.group({
        volume: ['00000', [Validators.required, zeroValidator]],
        cost: [coldWaterCost, [Validators.required, zeroValidator]]
      }),
      hotWater: _fb.group({
        volume: ['00000', [Validators.required, zeroValidator]],
        cost: [hotWaterCost, [Validators.required, zeroValidator]]
      }),
      electricity: _fb.group({
        volume: ['00000', [Validators.required, zeroValidator]],
        cost: [electricityCost, [Validators.required, zeroValidator]]
      })
    })
  }

  calculateBill() {
    this._service.calculateBill(
      (Object.values(this.countersForm.value) as { volume: string, cost: string }[])
        .map(i => ([+i.volume, +i.cost]))
        .reduce((acc, cur) => [...acc, ...cur], [])
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

  openEditCostDialog() {
    const dialogRef = this._dialog.open(EditPriceDialogComponent)
    dialogRef.afterClosed().subscribe(changesSaved => {
      if (changesSaved) {
        console.log('save changes')
      }
    })
  }
}
