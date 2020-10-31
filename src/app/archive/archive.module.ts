import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { ArchiveComponent } from './archive.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArchiveComponent
      }
    ]),
    ReactiveFormsModule,
  ],
  declarations: [ArchiveComponent]
})
export class ArchiveModule {
}
