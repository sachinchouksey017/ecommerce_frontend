import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http_service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl
  constructor(private httpService: HttpService) { }
  getAllProduct() {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.getService(`${this.baseUrl}product`, true, httpOptions)
  }
  getAllCategory(){
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.getService(`${this.baseUrl}category`, true, httpOptions)
  
  }
}
