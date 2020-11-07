import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IBill } from '../shared/bill/bill.component'

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  constructor(private _http: HttpClient) {
  }

  getAllArchivedBills() {
    return this._http.get('api/archive') as Observable<IBill[]>
  }

  getLastArchivedBill() {
    return this._http.get('api/archive/last') as Observable<IBill>
  }

  saveBill(newBill: IBill) {
    return this._http.post('api/archive', newBill)
  }
}
