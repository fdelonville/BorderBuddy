import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileDetails} from "../models/file-details.model";
import {Justificatif} from "../models/justif.model";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = "http://localhost:8080/api/file"
  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<FileDetails> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileDetails>(`${this.baseUrl}/upload`, formData);
  }

  save(startDate: string, endDate: string, fileURL: string){
    const params = new HttpParams().set('startDate',startDate).set('endDate',endDate).set('fileURL', fileURL)
    return this.httpClient.post(`${this.baseUrl}/save`, params)
  }

  getBetweenDates(startDate: string, endDate: string):Observable<Justificatif[]> {
    const params = new HttpParams().set('startDate',startDate).set('endDate',endDate)
    return this.httpClient.post<Justificatif[]>(`${this.baseUrl}/display-period`, params)
  }

}
