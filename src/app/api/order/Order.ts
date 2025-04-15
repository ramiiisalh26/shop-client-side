import { Customer } from "../customer/Customer";

export interface Order{
    id: number;
    customer: Customer;
    orderDate: Date;
    orderStatus: String ;
    totalAmount: number ;
    // PaymentDetails paymentDetails;
    // Address shippingAddress;
    // Address billingAddress;
    // String shippingMethod;
    // List<OrderItem> orderItems;
  
}