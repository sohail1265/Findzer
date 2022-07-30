import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HrmService {

  constructor(
    private http: HttpClient,
  ) { }
  get_record(startDate: any, endDate: any) {
    let url;
    url = 'https://findzerapi.azurewebsites.net/api/Admin/ViewAllCaseComplete?startDate=' + startDate + '&endDate=' + endDate;
    return this.http.get(url);
  }
  getReport(startDate: any, endDate: any) {
    let url;
    url = 'https://findzerapi.azurewebsites.net/api/Admin/GetFullReport?startDate=' + startDate + '&endDate=' + endDate;
    return this.http.get(url);
  }
  AdminLogin(body:any){
    let url;
    url= 'https://findzerapi.azurewebsites.net/api/Account/LoginAdmin';
    return this.http.post(url,body);
  }
}
