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

  getAll(url: string, pagination: any = {currentPage: 0, pageSize: 10, search: ''}, filters: any[] = []) {
    return this.http.get(`${SERVER_URL}/${url}`, {
      headers: this.getHeaders(),
      params: this.getParams(pagination, filters)
    });
  }

  getOne(url, id) {
    return this.http.get(`${SERVER_URL}/${url}/${id}`, {
      params: this.getDefaultParams()
    });
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
    httpHeaders.set('lang', 'pt');
    return httpHeaders;
  }

  protected getDefaultParams() {
    return new HttpParams().set('lang', 'en_US');
  }

  protected getParams(pagination, filters): HttpParams {
    let filter = JSON.stringify(Object.assign(pagination, { filters }));
    filter = filter != null ? filter : '';
    return new HttpParams()
      .set('filters', filter)
      .set('lang', 'en_US');
  }
}
