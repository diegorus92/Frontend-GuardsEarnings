import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Journey } from 'src/_interfaces/IJourney';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private _url = environment.baseUrl;

  constructor(private http:HttpClient) { }


  createJourney(journey:Journey):Observable<any>{
    return this.http.post(this._url+"Journeys", journey);
  }
}
