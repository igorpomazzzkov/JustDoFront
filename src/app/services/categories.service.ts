import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../entity/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesURL: string;

  constructor(private http: HttpClient) {
    this.categoriesURL = "http://localhost:8080/categories";
  }

  public findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL, {responseType: 'json'});
  }
}
