import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { ArchiveService } from '../archive/archive.service'
import { IBill } from '../shared/bill/bill.component'

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<IBill> {

  constructor(private _archiveService: ArchiveService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBill> {
    return this._archiveService.getLastArchivedBill()
  }
}
