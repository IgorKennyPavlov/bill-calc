import { Injectable } from '@angular/core'
import { ArchiveService } from '../archive/archive.service'
import { IBill } from '../shared/bill/bill.component'
import { MatSnackBar } from '@angular/material/snack-bar'

const RUSSIAN_MONTHS = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь'
]

// TODO Отрефакторить всплывашки. Стилизовать под успех/ошибку
@Injectable()
export class MainService {
  lastBill: IBill = null
  newBill: IBill = null

  constructor(
    private _archiveService: ArchiveService,
    private _snackBar: MatSnackBar
  ) {
  }

  calculateBill(calculationData: number[]) {
    if (calculationData.some(i => !i)) {
      this._snackBar.open('Ошибка в новых данных. Повторите попытку.', 'Закрыть', { duration: 2200 })
      return
    }

    const [
      coldWaterCounter,
      coldWaterCost,
      hotWaterCounter,
      hotWaterCost,
      electricityCounter,
      electricityCost
    ] = calculationData

    // TODO стоимость утилизации тоже нужно получать через параметры
    const waterUtilizationCost = 29.09

    // TODO обработать ситуацию, если предыдущей записи в базе нет. Может, не здесь, а отдельным методом.
    const {
      coldWaterCounter: oldColdWaterCounter,
      hotWaterCounter: oldHotWaterCounter,
      electricityCounter: oldElectricityCounter
    } = this.lastBill

    if (!(oldColdWaterCounter && oldHotWaterCounter && oldElectricityCounter)) {
      this._snackBar.open('Ошибка в старых данных. Повторите попытку.', 'Закрыть', { duration: 2200 })
      return
    }

    const now = new Date(Date.now())
    const month = RUSSIAN_MONTHS[(now.getMonth() || 12) - 1]
    const year = now.getFullYear()

    const coldWaterUsed = coldWaterCounter - oldColdWaterCounter
    const hotWaterUsed = hotWaterCounter - oldHotWaterCounter
    const electricityUsed = electricityCounter - oldElectricityCounter

    const coldWaterTotal = ~~(coldWaterUsed * coldWaterCost * 100) / 100
    const hotWaterTotal = ~~(hotWaterUsed * hotWaterCost * 100) / 100
    const waterUtilizationTotal = ~~((coldWaterUsed + hotWaterUsed) * waterUtilizationCost * 100) / 100
    const electricityTotal = ~~(electricityUsed * electricityCost * 100) / 100

    const total = ~~((coldWaterTotal + hotWaterTotal + waterUtilizationTotal + electricityTotal) * 100) / 100

    this.newBill = {
      timestamp: now.toISOString(),
      month: month + ' ' + year,

      coldWaterCounter,
      coldWaterUsed,
      coldWaterCost,
      coldWaterTotal,

      hotWaterCounter,
      hotWaterUsed,
      hotWaterCost,
      hotWaterTotal,

      waterUtilizationCost,
      waterUtilizationTotal,

      electricityCounter,
      electricityUsed,
      electricityCost,
      electricityTotal,

      total
    }

  }

  saveNewBill() {
    this._archiveService.saveBill(this.newBill)
      .subscribe(
        res => {
          if (!res) {
            return
          }

          this._snackBar.open('Запись добавлена в архив', 'Закрыть', { duration: 2200 })
          this.clearNewBill()
        },
        err => {
          this._snackBar.open('Произошла ошибка. Повторите попытку.', 'Закрыть', { duration: 2200 })
          console.error({ err })
        })
  }

  clearNewBill() {
    this.newBill = null
  }
}
