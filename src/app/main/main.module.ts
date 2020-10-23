import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MainComponent } from './main.component';
import { CounterRecognizerComponent } from './counter-recognizer/counter-recognizer.component'
import { ReactiveFormsModule } from '@angular/forms'

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
        ReactiveFormsModule
    ],
  declarations: [MainComponent, CounterRecognizerComponent]
})
export class MainModule {
}
