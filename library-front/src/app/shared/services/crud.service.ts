import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string) {
    return this.http.get(url);
  }

  post(url, body) {
    return this.http.post(url, body);
  }

  update(url, body) {
    return this.http.put(url, body);
  }

  updatePartial(url, body) {
    return this.http.patch(url, body);
  }

  delete(url, body) {
    return this.http.delete(url, body);
  }
}
