import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Work } from 'src/_interfaces/IWork';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private _url = environment.baseUrl;

  constructor(private http:HttpClient) { }


  createWork(work:any):Observable<any>{
    return this.http.post(this._url+"Works/", work, {responseType: 'text'});
  }
}
