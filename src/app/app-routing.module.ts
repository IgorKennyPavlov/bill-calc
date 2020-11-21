import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainResolver } from './main/main.resolver'

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () => import('src/app/main/main.module').then(m => m.MainModule),
    resolve: {
      mainResolver: MainResolver
    }
  },
  {
    path: 'archive',
    loadChildren: () => import('src/app/archive/archive.module').then(m => m.ArchiveModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
