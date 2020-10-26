import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainModule } from './main/main.module'

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('src/app/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'archive',
    loadChildren: () => import('src/app/archive/archive.module').then(m => m.ArchiveModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, MainModule]
})
export class AppRoutingModule {
}
