import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private readonly httpClient: HttpClient) {}

  getAllTypes(){
    return this.httpClient.get('http://localhost:8080/api/day/types')
  }

  assignType(form: FormGroup){
    return this.httpClient.post('http://localhost:8080/api/day/assign-type',form)
  }

  assignStatus(form: FormGroup){
    return this.httpClient.post('http://localhost:8080/api/day/assign-status',form)
  }
}
