import { Component, Input } from '@angular/core'

export interface IBill {
  timestamp: string,
  monthYear: string,
  coldWaterCounter: number,
  coldWaterUsed: number,
  coldWaterPrice: number,
  coldWaterTotal: number,
  hotWaterCounter: number,
  hotWaterUsed: number,
  hotWaterPrice: number,
  hotWaterTotal: number,
  waterUtilizationPrice: number,
  waterUtilizationTotal: number,
  electricityCounter: number,
  electricityUsed: number,
  electricityPrice: number,
  electricityTotal: number,
  total: number
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  @Input() billData: IBill
}
