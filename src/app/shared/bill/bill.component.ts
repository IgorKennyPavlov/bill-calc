import { Component, Input } from '@angular/core'

export interface IBill {
  timestamp: string,
  month: string,
  coldWaterCounter: number,
  coldWaterUsed: number,
  coldWaterCost: number,
  coldWaterTotal: number,
  hotWaterCounter: number,
  hotWaterUsed: number,
  hotWaterCost: number,
  hotWaterTotal: number,
  waterUtilizationCost: number,
  waterUtilizationTotal: number,
  electricityCounter: number,
  electricityUsed: number,
  electricityCost: number,
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
