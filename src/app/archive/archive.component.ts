import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { ArchiveService } from './archive.service'
import { IBill } from '../shared/bill/bill.component'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnDestroy {
  private _subscriptions: Subscription[] = []

  archiveBills: IBill[]

  constructor(private _service: ArchiveService) {
    this._subscriptions.push(this._service.getAllArchivedBills().subscribe(entries => this.archiveBills = entries))
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
