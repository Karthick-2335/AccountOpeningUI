import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SIPBasket } from 'src/model/request/sipModel';
import { apiresponse } from 'src/model/response/responseModel';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SipService {

  private readonly url: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAll(): Observable<apiresponse> {
    return this.http.get<apiresponse>(this.url + "product");
  }
  postSip(SIPBasket: SIPBasket): Observable<SIPBasket> {
    return this.http.post<SIPBasket>(this.url + "product", SIPBasket);
  }
}
