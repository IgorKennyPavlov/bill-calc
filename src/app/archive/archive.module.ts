import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { ArchiveComponent } from './archive.component'
import { ArchiveService } from './archive.service'

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
    HttpClientModule
  ],
  providers: [ArchiveService],
  declarations: [ArchiveComponent]
})
export class ArchiveModule {
}
