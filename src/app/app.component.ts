import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navbarSchema = [
    {
      title: 'Калькулятор',
      link: '/main'
    },
    {
      title: 'Архив',
      link: '/archive'
    }
  ]
}
