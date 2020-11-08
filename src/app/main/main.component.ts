import { Component } from '@angular/core'
import { MainService } from './main.service'
import { IBill } from '../shared/bill/bill.component'
import { AbstractControl, FormControl, Validators } from '@angular/forms'
import { getErrorMessage, zeroValidator } from '../shared/validators'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  countersSchema = [
    {
      title: 'Холодная вода',
      titleClass: 'cold-water',
      ctrl: new FormControl('00000', [Validators.required, zeroValidator])
    },
    {
      title: 'Горячая вода',
      titleClass: 'hot-water',
      ctrl: new FormControl('00000', [Validators.required, zeroValidator])
    },
    {
      title: 'Эл. энергия',
      titleClass: 'electricity',
      ctrl: new FormControl('00000', [Validators.required, zeroValidator]),
      brightness: 1.4,
      contrast: 30
    }
  ]

  get someCountersInvalid(): boolean {
    return this.countersSchema.some(counter => counter.ctrl.invalid)
  }

  get newBill(): IBill {
    return this._service.newBill
  }

  constructor(private _service: MainService) {
  }

  calculateBill() {
    const [coldWater, hotWater, electricity] = this.countersSchema.map(counter => counter.ctrl.value)
    this._service.calculateBill(coldWater, hotWater, electricity)
  }

  saveNewBill() {
    this._service.saveNewBill()
  }

  clearNewBill() {
    this._service.clearNewBill()
  }

  updateControl(ctrl: FormControl, event: string) {
    ctrl.setValue(event)
  }

  getErrorMessage(ctrl: AbstractControl): string {
    return getErrorMessage(ctrl)
  }
}
