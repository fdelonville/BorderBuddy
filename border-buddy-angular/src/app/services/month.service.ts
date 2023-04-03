import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Month} from "../models/month.model";

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor(private readonly httpClient: HttpClient) {}
  getOne(date: string){
    const params = new HttpParams().set('date',date)
    return this.httpClient.get<Month>('http://localhost:8080/api/month/display',{params})
  }
  getCurrent(){
    return this.httpClient.get<Month>('http://localhost:8080/api/month/current')
  }

  createPeriod(startDate: string, endDate: string){
    const params = new HttpParams().set('startDate',startDate).set('endDate',endDate)
    return this.httpClient.post('http://localhost:8080/api/month/new-period',params)
  }
}
