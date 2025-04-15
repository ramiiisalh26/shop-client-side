import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../../api/product/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8090/api/v1/product";

  constructor(private httpClient: HttpClient) { }

  searchProduct(searchTerm: string, page: number, size: number): Observable<any>{
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page)
      .set('size',size);
    return this.httpClient.get<any>(`${this.baseUrl}/search`,{ params });
  }

  getProductsList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/all`);
  } 

  getProductById(id: String): Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`this.baseUrl/${id}`,product);
  }

  deleteProduct(id: number): Observable<Product>{
    return this.httpClient.delete<Product>(`this.baseUrl/${id}`);
  }

  getBestSeller(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`this.baseUrl/best_seller`);
  }

  getNewArrivalsProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`this.baseUrl/new_arrivals`);
  }

  getTopTenOffers(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`this.baseUrl/top_offers`);
  }

  getProductByBrand(brand_name: String): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`this.baseUrl/${brand_name}`);
  }

  getProductByColor(color: String):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`this.baseUrl/${color}`);
  }

  getOfferProducts() : Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/offerProducts`);
  }
}
