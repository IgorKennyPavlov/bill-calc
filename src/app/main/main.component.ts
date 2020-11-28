import { Component, OnDestroy } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
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
export class MainComponent implements OnDestroy {
  private _subscriptions: Subscription[] = []

  countersForm: FormGroup

  pricesSchema: { title: string, value: number }[] = []

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
    // TODO типизировать через объект
    this.countersForm = _fb.group({
      coldWater: ['00000', [Validators.required, zeroValidator]],
      hotWater: ['00000', [Validators.required, zeroValidator]],
      electricity: ['00000', [Validators.required, zeroValidator]]
    })

    this.lastBill = this._activatedRoute.snapshot.data.mainResolver

    this.pricesSchema = [
      {
        title: 'Хол. вода',
        value: this.lastBill['coldWaterPrice']
      },
      {
        title: 'Гор. вода',
        value: this.lastBill['hotWaterPrice']
      },
      {
        title: 'Водоотведение',
        value: this.lastBill['waterUtilizationPrice']
      },
      {
        title: 'Эл. энергия',
        value: this.lastBill['electricityPrice']
      }
    ]
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe())
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
    this._subscriptions.push(
      this._dialog.open(EditPriceDialogComponent)
        .afterClosed()
        .pipe(take(1))
        .subscribe(changes => changes && (this.lastBill = { ...this._service.lastBill, ...changes })))
  }
}
