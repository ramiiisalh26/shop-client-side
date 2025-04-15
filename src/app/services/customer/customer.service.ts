import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../api/customer/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // Observable => used for handling asynchronous data streams.

  private baseurl = "http://localhost:8090/api/v1/customers";

  constructor(private httpClient: HttpClient) {}

  getCustomerList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.baseurl);
  }

  createCustomer(customer: Customer):Observable<Customer>{
    return this.httpClient.post<Customer>(this.baseurl, customer);
  }

  getCustomerById(id: number): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseurl}/${id}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer>{
    return this.httpClient.put<Customer>(`${this.baseurl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<Customer>{
    return this.httpClient.delete<Customer>(`${this.baseurl}/${id}`);
  }

}
