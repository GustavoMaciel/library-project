import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  getAll(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`);
  }

  getOne(url, id) {
    return this.http.get(`${this.baseUrl}/${url}/${id}`);
  }

  post(url, body) {
    return this.http.post(`${this.baseUrl}/${url}`, body);
  }

  update(url, body) {
    return this.http.put(`${this.baseUrl}/${url}`, body);
  }

  updatePartial(url, body) {
    return this.http.patch(`${this.baseUrl}/${url}`, body);
  }

  delete(url, body) {
    return this.http.delete(`${this.baseUrl}/${url}`, body);
  }
}
