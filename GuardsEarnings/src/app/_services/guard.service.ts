import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Guard } from 'src/_interfaces/IGuard';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  private _url = environment.baseUrl;
  private _guardsSubject = new BehaviorSubject<Guard[]>([])

  constructor(private http:HttpClient) { }


  get guardsSubject$():Observable<Guard[]>{
    return this._guardsSubject.asObservable();
  }

  setGuardsSubject$(guards:Guard[]):void{
    this._guardsSubject.next(guards);
  }

  getGuards():Observable<any>{
    return this.http.get(this._url+"Guards");
  }

  getGuard(id:number):Observable<any>{
    return this.http.get(this._url+"Guards/"+id);
  }
}
