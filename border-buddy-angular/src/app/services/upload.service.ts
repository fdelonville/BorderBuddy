import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileDetails} from "../models/file-details.model";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = "http://localhost:8080"
  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<FileDetails> {

    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileDetails>(`${this.baseUrl}/simple-form-upload-mvc`, formData);
  }

}
