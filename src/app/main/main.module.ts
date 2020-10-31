import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { MainComponent } from './main.component'
import { CounterRecognizerComponent } from './counter-recognizer/counter-recognizer.component'
import { MainService } from './main.service'

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
    HttpClientModule
  ],
  providers: [MainService],
  declarations: [MainComponent, CounterRecognizerComponent]
})
export class MainModule {
}
