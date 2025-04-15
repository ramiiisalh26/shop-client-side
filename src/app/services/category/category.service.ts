import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../api/category/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8090/api/v1/category";

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.baseUrl}/all`);
  }

  createCategory(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(this.baseUrl,category);
  }

  getCategoreyById(id: number): Observable<Category>{
    return this.httpClient.get<Category>(`this.baseUrl/${id}`);
  }

  updateCateogry(id: number, category: Category): Observable<Category>{
    return this.httpClient.put<Category>(`this.baseUrl/${id}`,category);
  }

  deleteCategory(id: number): Observable<Category>{
    return this.httpClient.delete<Category>(`this.baseUrl/${id}`);
  }

  getCatrgoryByName(category_name: String | null): Observable<Category>{
    return this.httpClient.get<Category>(`${this.baseUrl}/by/${category_name}`);
  }

}
