import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class ArchiveService {
  constructor(private _http: HttpClient) {
  }

  getArchive() {
    return this._http.get('api/archive') as Observable<{ [key: string]: any }[]>
  }
}
