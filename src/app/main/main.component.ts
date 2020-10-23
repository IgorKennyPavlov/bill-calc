import { Component } from '@angular/core'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  coldWater = 0
  hotWater = 0
  electricity = 0

  countPrice() {
    console.log(this.coldWater, this.hotWater, this.electricity)
  }
}
