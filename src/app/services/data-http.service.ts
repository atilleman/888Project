import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class DataHttpService {

  httpOptionsHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //private Params:string;

  _baseUrl: string="";

  constructor(private http: HttpClient) { 
    if (window.location.href.indexOf('localhost') > -1)
    {
      this._baseUrl = environment.baseUrl
    }
  }

  PostData(controllerName: string, funcName: string, MyList: any[]):Observable<any>{
    return this.http.post<any>(this._baseUrl + '/' + controllerName + '/' + funcName, MyList, this.httpOptionsHeaders);
  }

}
