import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Month} from "../models/month.model";

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor(private readonly httpClient: HttpClient) {}
  getOne(date: string, login: string){
    const params = new HttpParams().set('date',date).set('login',login)
    return this.httpClient.get<Month>('http://localhost:8080/api/month/display',{params})
  }

  createPeriod(startDate: string, endDate: string, login: string){
    const params = new HttpParams().set('startDate',startDate).set('endDate',endDate).set('login',login)
    return this.httpClient.post('http://localhost:8080/api/month/new-period',params)
  }
}
