import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { ArchiveService, IArchiveEntry } from './archive.service'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnDestroy {
  private _subscriptions: Subscription[] = []

  archiveEntries: IArchiveEntry[]

  constructor(private _service: ArchiveService) {
    this._subscriptions.push(this._service.getArchiveEntries().subscribe(entries => this.archiveEntries = entries))
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
