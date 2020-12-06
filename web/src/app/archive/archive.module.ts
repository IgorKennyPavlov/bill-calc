import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { MatExpansionModule } from '@angular/material/expansion'

import { ArchiveComponent } from './archive.component'
import { SharedModule } from '../shared/shared.module'

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
    SharedModule,
    MatExpansionModule
  ],
  declarations: [ArchiveComponent]
})
export class ArchiveModule {
}
