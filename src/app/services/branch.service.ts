import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  baseUrl: string = 'https://localhost:44376/api/';
  constructor(private _http: HttpClient) {

  }

  getCurrencies(): Observable<any> {
    return this._http.get(this.baseUrl + 'Currency/GetCurrencies');
  }

  getBranches(): Observable<any> {
    return this._http.get(this.baseUrl + 'Branch/Get');
  }

  addBranch(data: any): Observable<any> {
    return this._http.post(this.baseUrl + 'Branch/Add', data);
  }

  updateBranch(data: any): Observable<any> {
    return this._http.post(this.baseUrl + 'Branch/Update', data);
  }

  deleteBranch(id: number): Observable<any> {
    return this._http.delete(this.baseUrl +`Branch/Delete/?id=${id}`);
  }
}
