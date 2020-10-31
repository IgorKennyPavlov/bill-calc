import { Injectable } from '@angular/core'
import { ArchiveService } from '../archive/archive.service'

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
  private _oldColdWaterCounter: number
  private _oldHotWaterCounter: number
  private _oldElectricityCounter: number

  constructor(private _archiveService: ArchiveService) {
    _archiveService.getLastArchiveEntry()
      .subscribe(lastEntry => {
        this._oldColdWaterCounter = lastEntry.coldWaterCounter
        this._oldHotWaterCounter = lastEntry.hotWaterCounter
        this._oldElectricityCounter = lastEntry.electricityCounter
      })
  }

  countPrice(coldWaterCounter, hotWaterCounter, electricityCounter) {
    if (!coldWaterCounter) {
      throw Error('No cold water expense data entered!')
    }

    if (!hotWaterCounter) {
      throw Error('No hot water expense data entered!')
    }

    if (!electricityCounter) {
      throw Error('No electricity expense data entered!')
    }

    if (!(this._oldColdWaterCounter && this._oldHotWaterCounter && this._oldElectricityCounter)) {
      throw Error('Could not retrieve old counter data!')
    }

    const now = new Date(Date.now())
    const month = RUSSIAN_MONTHS[(now.getMonth() || 12) - 1]
    const year = now.getFullYear()

    const coldWaterUsed = coldWaterCounter - this._oldColdWaterCounter
    const hotWaterUsed = hotWaterCounter - this._oldHotWaterCounter
    const electricityUsed = electricityCounter - this._oldElectricityCounter

    const coldWaterTotal = ~~(coldWaterUsed * coldWaterCost * 100) / 100
    const hotWaterTotal = ~~(hotWaterUsed * hotWaterCost * 100) / 100
    const waterUtilizationTotal = ~~((coldWaterUsed + hotWaterUsed) * waterUtilizationCost * 100) / 100
    const electricityTotal = ~~(electricityUsed * electricityCost * 100) / 100

    const total = ~~((coldWaterTotal + hotWaterTotal + waterUtilizationTotal + electricityTotal) * 100) / 100

    // TODO Разделить методы на Посчитать и Сохранить.
    //  Добавить обратную связь после сохранения(вывести новую запись, либо показать сообщение об ошибке)
    this._archiveService.addArchiveEntry({
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
    })
      .subscribe((res: { status: 'success' | 'failure' }) => {
        if (res.status === 'success') {
          console.log({ res })
          // console.table({ coldWaterUsed, coldWaterTotal })
          // console.table({ hotWaterUsed, hotWaterTotal })
          // console.table({ waterUtilizationTotal })
          // console.table({ electricityUsed, electricityTotal })
          // console.table({ total })
        } else {
          console.log({ res })
        }
      })
  }
}
