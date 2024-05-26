import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IApiResponse from '../interfaces/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl = 'http://localhost:5271/api/'
  private apiEndpoints = {
    app: {
      default: 'app',
      login: 'app/login'
    },
    admin: {
      create: 'admin/create'
    }
  }

  constructor(private http: HttpClient) { }

  // App
  checkApp() {
    return this.http.get<IApiResponse>(this.baseUrl + this.apiEndpoints.app.default);
  }

  login(form:any) {
    return this.http.post<IApiResponse>(this.baseUrl + this.apiEndpoints.app.login, form);
  }

  // Admin
  createAdmin(form: any) {
    return this.http.post<IApiResponse>(this.baseUrl + this.apiEndpoints.admin.create, form)
  }
}
