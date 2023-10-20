import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'src/model/response/responseModel';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private readonly url: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getIfscDetails(ifsc: string): Observable<response> {
    return this.http.get<response>(this.url + 'bank/'+ifsc);
  }
}
