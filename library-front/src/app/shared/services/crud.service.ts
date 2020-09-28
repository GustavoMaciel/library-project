import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = 'http://localhost:8080/library';

  constructor(
    private http: HttpClient
  ) { }

  getAll(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`, {
      headers: this.getHeaders(),
      params: this.getParams()
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
    httpHeaders.set('lang', 'en_US')
    return httpHeaders;
  }

  protected getParams(): HttpParams {
    const params = new HttpParams();
    params.set('lang', 'en_US');
    return params;
  }
}
