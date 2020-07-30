import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../entity/region';
import { City } from '../entity/city';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private regionURL: string;

  constructor(private http: HttpClient) {
    this.regionURL = "http://localhost:8080/regions";
  }

  public findAll(): Observable<Region[]>{
    return this.http.get<Region[]>(this.regionURL);
  }

  public findRegionByCity(city: City): Observable<string>{
    let params = new HttpParams().set('name', city.name);
    return this.http.get<string>(this.regionURL + "/city", {params: {'name': city.name}, responseType: 'text' as 'json'});
  }
}
