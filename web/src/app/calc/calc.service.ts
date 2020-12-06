import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormBuilder } from '@angular/forms'

import * as moment from 'moment'

import { ArchiveService } from '../archive/archive.service'
import { IBill } from '../shared/bill/bill.component'

// TODO Отрефакторить всплывашки. Стилизовать под успех/ошибку
@Injectable()
export class CalcService {
  lastBill: IBill = null
  newBill: IBill = null

  constructor(
    private _fb: FormBuilder,
    private _archiveService: ArchiveService,
    private _snackBar: MatSnackBar
  ) {
  }

  calculateBill(calculationData: number[]) {
    if (calculationData.some(i => !i)) {
      this._snackBar.open(
        'Ошибка в новых данных. Повторите попытку.',
        'Закрыть',
        { duration: 2200 }
      )
      return
    }

    const [coldWaterCounter, hotWaterCounter, electricityCounter] = calculationData

    // TODO Разделить стоимость горячей воды.
    const {
      coldWaterCounter: oldColdWaterCounter,
      hotWaterCounter: oldHotWaterCounter,
      electricityCounter: oldElectricityCounter,
      coldWaterPrice,
      hotWaterPrice,
      waterUtilizationPrice,
      electricityPrice
    } = this.lastBill

    if (!(oldColdWaterCounter && oldHotWaterCounter && oldElectricityCounter)) {
      this._snackBar.open(
        'Ошибка в старых данных. Повторите попытку.',
        'Закрыть',
        { duration: 2200 }
      )
      return
    }

    const coldWaterUsed = coldWaterCounter - oldColdWaterCounter
    const hotWaterUsed = hotWaterCounter - oldHotWaterCounter
    const electricityUsed = electricityCounter - oldElectricityCounter

    const coldWaterTotal = ~~(coldWaterUsed * coldWaterPrice * 100) / 100
    const hotWaterTotal = ~~(hotWaterUsed * hotWaterPrice * 100) / 100
    const waterUtilizationTotal = ~~((coldWaterUsed + hotWaterUsed) * waterUtilizationPrice * 100) / 100
    const electricityTotal = ~~(electricityUsed * electricityPrice * 100) / 100

    const total = ~~((coldWaterTotal + hotWaterTotal + waterUtilizationTotal + electricityTotal) * 100) / 100

    const now = moment()

    this.newBill = {
      timestamp: now.toISOString(),
      monthYear: now.format('MMMM YYYY'),

      coldWaterCounter,
      coldWaterUsed,
      coldWaterPrice,
      coldWaterTotal,

      hotWaterCounter,
      hotWaterUsed,
      hotWaterPrice,
      hotWaterTotal,

      waterUtilizationPrice,
      waterUtilizationTotal,

      electricityCounter,
      electricityUsed,
      electricityPrice,
      electricityTotal,

      total
    }

  }

  saveNewBill() {
    this._archiveService.saveBill(this.newBill)
      .subscribe(
        res => {
          if (res) {
            this._snackBar.open(
              'Запись добавлена в архив',
              'Закрыть',
              { duration: 2200 }
            )
            this.clearNewBill()
          }
        },
        err => {
          this._snackBar.open(
            'Произошла ошибка. Повторите попытку.',
            'Закрыть',
            { duration: 2200 }
          )
          console.error({ err })
        })
  }

  clearNewBill() {
    this.newBill = null
  }
}
