import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../models/register.form";
import {LoginForm} from "../models/login.form";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) {}

  register(form: RegisterForm){
    return this.httpClient.post('http://localhost:8080/api/register',form)
  }
  login(form: LoginForm){
    return this.httpClient.post('http://localhost:8080/api/auth/login',form)
  }
}
