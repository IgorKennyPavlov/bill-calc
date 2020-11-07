import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { MainComponent } from './main.component'
import { CounterRecognizerComponent } from './counter-recognizer/counter-recognizer.component'
import { MainService } from './main.service'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent
      }
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [MainService],
  declarations: [MainComponent, CounterRecognizerComponent]
})
export class MainModule {
}
