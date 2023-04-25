import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Guard } from 'src/_interfaces/IGuard';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  private _url = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getGuards():Observable<any>{
    return this.http.get(this._url+"Guards");
  }

  getGuard(id:number):Observable<any>{
    return this.http.get(this._url+"Guards/"+id);
  }
}
