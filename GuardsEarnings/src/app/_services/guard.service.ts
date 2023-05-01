import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Guard } from 'src/_interfaces/IGuard';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  private _url = environment.baseUrl+'Guards';
  //private _guardsSubject = new BehaviorSubject<Guard[]>([])

  constructor(private http:HttpClient) { }


  /*get guardsSubject$():Observable<Guard[]>{
    return this._guardsSubject.asObservable();
  }*/

  /*setGuardsSubject$(guards:Guard[]):void{
    this._guardsSubject.next(guards);
  }*/

  getGuards():Observable<any>{
    return this.http.get(this._url);
  }

  getGuard(id:number):Observable<any>{
    return this.http.get(this._url+"/"+id);
  }

  postGuard(newGuard:Guard):Observable<any>{
    return this.http.post(this._url, newGuard, {responseType: 'text'});
  }

  putGuard(id:number, guard:Guard):Observable<any>{
    return this.http.put(this._url+"/"+id, guard, {responseType: 'text'});
  }

  deleteGuard(id:number):Observable<any>{
    return this.http.delete(this._url+"/"+id, {responseType: 'text'});
  }
}
