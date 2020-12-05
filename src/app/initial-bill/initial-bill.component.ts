import { Component, OnDestroy } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MatDatepicker } from '@angular/material/datepicker'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Subscription } from 'rxjs'
import * as moment from 'moment'
import { Moment } from 'moment'

import { getErrorMessage, zeroValidator } from '../shared/validators'
import { ArchiveService } from '../archive/archive.service'

@Component({
  selector: 'app-initial-bill',
  templateUrl: './initial-bill.component.html',
  styleUrls: ['./initial-bill.component.scss']
})
export class InitialBillComponent implements OnDestroy {
  private _subs: Subscription[] = []

  billForm: FormGroup

  billFormSchema = [
    {
      ctrlName: 'monthYear',
      title: 'Месяц, год',
      type: 'date',
      required: true
    },
    {
      ctrlName: 'coldWaterCounter',
      title: 'Хол. вода (счётчик)',
      required: true
    },
    {
      ctrlName: 'coldWaterUsed',
      title: 'Хол.вода (расход за месяц)'
    },
    {
      ctrlName: 'coldWaterPrice',
      title: 'Хол. вода (цена)',
      required: true
    },
    {
      ctrlName: 'coldWaterTotal',
      title: 'Хол. вода (итого)'
    },
    {
      ctrlName: 'hotWaterCounter',
      title: 'Гор. вода (счётчик)',
      required: true
    },
    {
      ctrlName: 'hotWaterUsed',
      title: 'Гор. вода (расход за месяц)'
    },
    {
      ctrlName: 'hotWaterPrice',
      title: 'Гор. вода (цена)',
      required: true
    },
    {
      ctrlName: 'hotWaterTotal',
      title: 'Гор. вода (итого)'
    },
    {
      ctrlName: 'waterUtilizationPrice',
      title: 'Водоотведение (цена)',
      required: true
    },
    {
      ctrlName: 'waterUtilizationTotal',
      title: 'Водоотведение (итого)'
    },
    {
      ctrlName: 'electricityCounter',
      title: 'Эл. энергия (счётчик)',
      required: true
    },
    {
      ctrlName: 'electricityUsed',
      title: 'Эл. энергия (расход)'
    },
    {
      ctrlName: 'electricityPrice',
      title: 'Эл. энергия (цена)',
      required: true
    },
    {
      ctrlName: 'electricityTotal',
      title: 'Эл. энергия (итого)'
    },
    {
      ctrlName: 'total',
      title: 'Итого'
    }
  ]

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _archiveService: ArchiveService
  ) {
    this.billForm = _fb.group({
      monthYear: [moment(), [Validators.required]],
      coldWaterCounter: ['777', [Validators.required]],
      coldWaterUsed: '777',
      coldWaterPrice: ['777', [Validators.required, zeroValidator]],
      coldWaterTotal: '777',
      hotWaterCounter: ['777', [Validators.required]],
      hotWaterUsed: '777',
      hotWaterPrice: ['777', [Validators.required, zeroValidator]],
      hotWaterTotal: '777',
      waterUtilizationPrice: ['777', [Validators.required, zeroValidator]],
      waterUtilizationTotal: '777',
      electricityCounter: ['777', [Validators.required]],
      electricityUsed: '777',
      electricityPrice: ['777', [Validators.required, zeroValidator]],
      electricityTotal: '777',
      total: '777'
    })
  }

  ngOnDestroy() {
    this._subs.forEach(s => s.unsubscribe())
  }

  setYear(updatedYear: Moment) {
    const ctrl = this.billForm.get('monthYear')
    const ctrlValue = ctrl.value
    ctrlValue.year(updatedYear.year())
    ctrl.setValue(ctrlValue)
  }

  setMonth(updatedMonth: Moment, datepicker: MatDatepicker<any>) {
    const ctrl = this.billForm.get('monthYear')
    const ctrlValue = ctrl.value
    ctrlValue.month(updatedMonth.month())
    ctrl.setValue(ctrlValue)
    datepicker.close()
  }

  getErrorMessage(ctrl: AbstractControl): string {
    return getErrorMessage(ctrl)
  }

  saveInitialBill() {
    const monthYear = this.billForm.get('monthYear').value.format('MMMM YYYY')
    this._subs.push(
      this._archiveService.saveBill({
        timestamp: new Date().toISOString(),
        ...this.billForm.value,
        monthYear
      }).subscribe(
        () => this._router.navigate(['archive']),
        err => {
          this._snackBar.open(
            'Произошла ошибка. Проверьте данные и повторите попытку.',
            'Закрыть',
            { duration: 2200 }
          )
          console.error({ err })
        })
    )
  }
}
