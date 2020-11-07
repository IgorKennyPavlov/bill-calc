import { Component } from '@angular/core'
import { MainService } from './main.service'
import { IBill } from '../shared/bill/bill.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  coldWater = 0
  hotWater = 0
  electricity = 0

  get newBill(): IBill {
    return this._service.newBill
  }

  constructor(private _service: MainService) {
  }

  calculateBill() {
    this._service.calculateBill(this.coldWater, this.hotWater, this.electricity)
  }

  saveNewBill() {
    this._service.saveNewBill()
  }

  clearNewBill() {
    this._service.clearNewBill()
  }
}
