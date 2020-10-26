import { Component } from '@angular/core'
import { ArchiveService } from './archive.service'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {

  archive: { [key: string]: any }[]

  constructor(private _service: ArchiveService) {
    this.archive = this._service.getArchive()
  }

}
