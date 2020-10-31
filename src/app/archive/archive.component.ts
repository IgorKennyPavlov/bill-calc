import { Component } from '@angular/core'
import { ArchiveService, IArchiveEntry } from './archive.service'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {

  archiveEntries: IArchiveEntry[]

  constructor(private _service: ArchiveService) {
    this._service.getArchiveEntries().subscribe(entries => this.archiveEntries = entries)
  }

}
