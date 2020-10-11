import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainModule } from './main/main.module'

const routes: Routes = [{
  path: '',
  loadChildren: () => import('src/app/main/main.module').then(m => m.MainModule)
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, MainModule]
})
export class AppRoutingModule {
}
