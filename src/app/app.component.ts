import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navbarSchema = [
    {
      title: 'загрузка фото',
      link: '/main'
    },
    {
      title: 'архив',
      link: '/archive'
    }
  ]
}
