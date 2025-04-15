import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../api/orderItem/OrderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private baseUrl = "http://localhost:8090/api/v1/orderItems"

  constructor(private httpClient: HttpClient) { }

  getOrderItemList(): Observable<OrderItem[]>{
    return this.httpClient.get<OrderItem[]>(this.baseUrl);
  } 

  createOrderItem(orderItem: OrderItem): Observable<OrderItem>{
    return this.httpClient.post<OrderItem>(this.baseUrl, orderItem);
  }

  getOrderItemById(id: number): Observable<OrderItem>{
    return this.httpClient.get<OrderItem>(`this.baseUrl/${id}`);
  }

  updateOrderItem(id: number, orderItem: OrderItem): Observable<OrderItem>{
    return this.httpClient.put<OrderItem>(`this.baseUrl/${id}`,orderItem);
  }

  deleteOrderItem(id: number): Observable<OrderItem>{
    return this.httpClient.delete<OrderItem>(`this.baseUrl/${id}`);
  }

}
