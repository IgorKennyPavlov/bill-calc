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

const coldWaterCost = 23.9
const hotWaterCost = ~~((24.79 + 164.64) * 100) / 100 // Носитель + энергия
const waterUtilizationCost = 29.09
const electricityCost = 4.01

@Injectable()
export class MainService {
  private _lastBill: IBill
  newBill: IBill = null

  constructor(private _archiveService: ArchiveService, private _snackBar: MatSnackBar) {
    _archiveService.getLastArchivedBill()
      .subscribe(lastBill => this._lastBill = lastBill)
  }

  calculateBill(coldWaterCounter: number, hotWaterCounter: number, electricityCounter: number) {
    // TODO Заменить выброс ошибок нормальными уведомлениями
    if (!coldWaterCounter) {
      throw Error('No cold water expense data entered!')
    }

    if (!hotWaterCounter) {
      throw Error('No hot water expense data entered!')
    }

    if (!electricityCounter) {
      throw Error('No electricity expense data entered!')
    }

    const {
      coldWaterCounter: oldColdWaterCounter,
      hotWaterCounter: oldHotWaterCounter,
      electricityCounter: oldElectricityCounter
    } = this._lastBill

    if (!(oldColdWaterCounter && oldHotWaterCounter && oldElectricityCounter)) {
      throw Error('Could not retrieve old counter data!')
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
    // TODO Стилизовать всплывающие подсказки (успех, ошибка)
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
          this._snackBar.open('Произошла ошибка. Попробуйте ещё.', 'Закрыть', { duration: 2200 })
          console.log({ err })
        })
  }

  clearNewBill() {
    this.newBill = null
  }
}
