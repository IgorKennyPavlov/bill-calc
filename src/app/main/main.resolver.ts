import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'
import { ArchiveService } from '../archive/archive.service'
import { IBill } from '../shared/bill/bill.component'

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<IBill> {

  constructor(private _archiveService: ArchiveService, private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBill> {
    return this._archiveService.getLastArchivedBill()
      .pipe(
        take(1),
        tap(lastBill => !lastBill && this._router.navigate(['initial-bill']))
      )
  }
}
