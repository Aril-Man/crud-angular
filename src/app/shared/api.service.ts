import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data)
    .pipe(map(res => {
      return res;
    }
    ));
  }

  getEmployee() {
    return this.http.get<any>('http://localhost:3000/posts')
    .pipe(map(res => {
      return res;
    }
    ));
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id)
    .pipe(map(res => {
      return res;
    }
    ));
  }

  updateEmployee(id: number, data: any) {
    return this.http.put<any>('http://localhost:3000/posts/' + id, data)
    .pipe(map(res => {
      return res;
    }
    ));
  }
}
