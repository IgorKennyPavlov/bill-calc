import { Component } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navbarSchema = [
    {
      title: 'Калькулятор',
      link: '/calc'
    },
    {
      title: 'Архив',
      link: '/archive'
    }
  ]

  constructor() {
    moment.locale('ru')
  }
}
