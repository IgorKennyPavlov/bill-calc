import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DateAdapter } from '@angular/material/core'
import { getErrorMessage, zeroValidator } from '../shared/validators'

@Component({
  selector: 'app-initial-bill',
  templateUrl: './initial-bill.component.html',
  styleUrls: ['./initial-bill.component.scss']
})
export class InitialBillComponent {
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

  constructor(private _fb: FormBuilder, private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale('ru-RU')

    this.billForm = _fb.group({
      monthYear: ['', [Validators.required]],
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

  getErrorMessage(ctrl: AbstractControl): string {
    return getErrorMessage(ctrl)
  }

  saveInitialBill() {
    // TODO доделать сохранение
    console.log('initial bill saved')
  }
}
