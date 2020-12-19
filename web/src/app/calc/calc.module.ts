import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

import { SharedModule } from '../shared/shared.module'

import { CalcComponent } from './calc.component'
import { CalcService } from './calc.service'
import { CounterRecognizerComponent } from './counter-recognizer/counter-recognizer.component'
import { EditPriceDialogComponent } from './edit-price-dialog/edit-price-dialog.component'
import { PhotoDialogComponent } from './counter-recognizer/photo-dialog/photo-dialog.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalcComponent
      }
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [CalcService],
  declarations: [CalcComponent, CounterRecognizerComponent, EditPriceDialogComponent, PhotoDialogComponent]
})
export class CalcModule {
}
