import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservableLike } from 'rxjs';
import { Target } from 'src/_interfaces/ITarget';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  private _url = environment.baseUrl+"Targets";
  private _targetsSubject = new BehaviorSubject<any[]>([]);


  constructor(private http:HttpClient) { }

  get targetsSubject$():Observable<any[]>{
    return this._targetsSubject.asObservable();
  }

  setTargetSubject$(targets:any[]):void{
    this._targetsSubject.next(targets);
  }

  getTargets():Observable<any>{
    return this.http.get(this._url);
  }

  getTarget(id:number):Observable<any>{
    return this.http.get(this._url+"/"+id);
  }

  postTarget(target:Target):Observable<any>{
    return this.http.post(this._url, target, {responseType : 'text'});
  }

  putTarget(id:number, target:Target):Observable<any>{
    return this.http.put(this._url+"/"+id, target, {responseType: 'text'});
  }

  deleteTarget(id:number):Observable<any>{
    return this.http.delete(this._url+"/"+id, {responseType: 'text'});
  }
}
