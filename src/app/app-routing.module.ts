import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalcResolver } from './calc/calc.resolver'

const routes: Routes = [
  { path: '', redirectTo: 'calc', pathMatch: 'full' },
  {
    path: 'calc',
    loadChildren: () => import('src/app/calc/calc.module').then(m => m.CalcModule),
    resolve: {
      calcResolver: CalcResolver
    }
  },
  {
    path: 'archive',
    loadChildren: () => import('src/app/archive/archive.module').then(m => m.ArchiveModule)
  },
  {
    path: 'initial-bill',
    loadChildren: () => import('src/app/initial-bill/initial-bill.module').then(m => m.InitialBillModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
