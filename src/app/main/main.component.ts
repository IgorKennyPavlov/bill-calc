import { Component } from '@angular/core'
import { MainService } from './main.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  coldWater = 0
  hotWater = 0
  electricity = 0

  constructor(private _service: MainService) {
  }

  countPrice() {
    this._service.countPrice(this.coldWater, this.hotWater, this.electricity)
  }
}
