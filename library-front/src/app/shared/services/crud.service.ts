import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SERVER_URL } from '../url/url.domain';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(url: string) {
    return this.http.get(`${SERVER_URL}/${url}`, {
      headers: this.getHeaders(),
      params: this.getParams()
    });
  }

  getOne(url, id) {
    return this.http.get(`${SERVER_URL}/${url}/${id}`);
  }

  post(url, body) {
    return this.http.post(`${SERVER_URL}/${url}`, body);
  }

  update(url, body) {
    return this.http.put(`${SERVER_URL}/${url}/${body.id}`, body);
  }

  updatePartial(url, body) {
    return this.http.patch(`${SERVER_URL}/${url}/${body.id}`, body);
  }

  delete(url, body) {
    return this.http.delete(`${SERVER_URL}/${url}/${body.id}`);
  }

  protected getHeaders(): HttpHeaders {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    return httpHeaders;
  }

  protected getParams(): HttpParams {
    const params = new HttpParams();
    params.set('lang', 'en_US');
    return params;
  }
}
