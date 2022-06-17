import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl:string = "https://localhost:7227";

  constructor(private httpClient: HttpClient) {
    
   }

   getStudent(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(this.baseApiUrl + "/students");
   }
}
