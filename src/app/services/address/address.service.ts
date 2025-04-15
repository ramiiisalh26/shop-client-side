import { Injectable } from '@angular/core';
export interface Address{
    id: number;
    street_address: String
    city: String
    state: String
    zip: String
    country: String
}
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  // private baseUrl = 
  // constructor() { }
}
