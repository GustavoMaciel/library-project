import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  baseUrl = 'http://localhost:8080/library';

  constructor(
    private http: HttpClient
  ) { }

  getAll(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`, {
      headers: this.getHeaders()
    });
  }

  getOne(url, id) {
    return this.http.get(`${this.baseUrl}/${url}/${id}`);
  }

  post(url, body) {
    return this.http.post(`${this.baseUrl}/${url}`, body);
  }

  update(url, body) {
    return this.http.put(`${this.baseUrl}/${url}/${body.id}`, body);
  }

  updatePartial(url, body) {
    return this.http.patch(`${this.baseUrl}/${url}/${body.id}`, body);
  }

  delete(url, body) {
    return this.http.delete(`${this.baseUrl}/${url}/${body.id}`);
  }

  protected getHeaders(): HttpHeaders {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    return httpHeaders;
  }
}
