import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../api/order/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private baseUrl = "http://localhost:8090/api/v1/orders";
  
  constructor(private httpClient: HttpClient) { }

  getOrderList(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.baseUrl);
  }

  createOrders(order: Order): Observable<Order>{
    return this.httpClient.post<Order>(this.baseUrl,order);
  }

  getOrderById(id: number): Observable<Order>{
    return this.httpClient.get<Order>(`this.baseUrl/${id}`);
  }

  updateOrder(id: number, order: Order): Observable<Order>{
    return this.httpClient.put<Order>(`this.baseUrl/${id}`, order);
  }

  deleteOrder(id: number): Observable<Order>{
    return this.httpClient.delete<Order>(`this.baseUrl/${id}`);
  }

}
