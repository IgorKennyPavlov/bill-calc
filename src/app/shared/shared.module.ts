import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BillComponent } from './bill/bill.component'

@NgModule({
  declarations: [BillComponent],
  exports: [BillComponent],
  imports: [CommonModule]
})
export class SharedModule {
}
