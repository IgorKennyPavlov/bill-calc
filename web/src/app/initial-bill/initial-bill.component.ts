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
      coldWaterCounter: ['', [Validators.required]],
      coldWaterUsed: '',
      coldWaterPrice: ['', [Validators.required, zeroValidator]],
      coldWaterTotal: '',
      hotWaterCounter: ['', [Validators.required]],
      hotWaterUsed: '',
      hotWaterPrice: ['', [Validators.required, zeroValidator]],
      hotWaterTotal: '',
      waterUtilizationPrice: ['', [Validators.required, zeroValidator]],
      waterUtilizationTotal: '',
      electricityCounter: ['', [Validators.required]],
      electricityUsed: '',
      electricityPrice: ['', [Validators.required, zeroValidator]],
      electricityTotal: '',
      total: ''
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
