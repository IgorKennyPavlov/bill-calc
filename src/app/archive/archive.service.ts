import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface IArchiveEntry {
  timestamp: string,
  month: string,
  coldWaterCounter: number,
  coldWaterUsed: number,
  coldWaterCost: number,
  coldWaterTotal: number,
  hotWaterCounter: number,
  hotWaterUsed: number,
  hotWaterCost: number,
  hotWaterTotal: number,
  waterUtilizationCost: number,
  waterUtilizationTotal: number,
  electricityCounter: number,
  electricityUsed: number,
  electricityCost: number,
  electricityTotal: number,
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  constructor(private _http: HttpClient) {
  }

  getArchiveEntries() {
    return this._http.get('api/archive') as Observable<IArchiveEntry[]>
  }

  getLastArchiveEntry() {
    return this._http.get('api/archive/last') as Observable<IArchiveEntry>
  }

  addArchiveEntry(newEntry: IArchiveEntry) {
    return this._http.post('api/archive', newEntry)
  }
}
