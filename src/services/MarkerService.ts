import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MarkerService {
  constructor(private http: Http) { }

  private baseUrl = 'http://localhost:3000';


  getMarkers() {
    return this.http.get(this.baseUrl + '/markers')
      .map(response => response.json());
  }

  createMarker( marker ) {
    return this.http.post(this.baseUrl + '/markers',marker)
      .map(response => response.json());
  }

  deleteMarker( id ) {
    return this.http.delete(this.baseUrl+'/markers/'+id);
  }
}
