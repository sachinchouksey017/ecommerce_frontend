import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../http_service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl
  constructor(private httpService: HttpService) { }
  login(data) {
    return this.httpService.postService(data,`http://localhost:3000/login`)

  }
}
