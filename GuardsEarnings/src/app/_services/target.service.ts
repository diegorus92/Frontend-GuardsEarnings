import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Target } from 'src/_interfaces/ITarget';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  private _url = environment.baseUrl;
  private _targetsSubject = new BehaviorSubject<any[]>([]);


  constructor(private http:HttpClient) { }

  get targetsSubject$():Observable<any[]>{
    return this._targetsSubject.asObservable();
  }

  setTargetSubject$(targets:any[]):void{
    this._targetsSubject.next(targets);
  }

  getTargets():Observable<any>{
    return this.http.get(this._url+"Targets");
  }
}
