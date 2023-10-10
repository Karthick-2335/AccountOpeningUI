import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response,SIPBasket } from 'src/model/sipModel';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SipService {

  private readonly url:string = environment.baseUrl

  constructor(private http:HttpClient) { }

  getAll():Observable<response>
  {
    return this.http.get<response>(this.url);
  }
  postSip(SIPBasket:SIPBasket):Observable<SIPBasket>{
    return this.http.post<SIPBasket>(this.url + "product",SIPBasket);
  }
}
