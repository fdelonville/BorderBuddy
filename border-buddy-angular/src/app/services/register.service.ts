import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../models/register.form";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly httpClient: HttpClient) {}

  register(form: RegisterForm){
    return this.httpClient.post('http://localhost:8080/api/register',form)
  }
}
