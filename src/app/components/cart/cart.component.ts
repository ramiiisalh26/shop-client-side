import { AfterViewInit, Component, ElementRef, OnInit, input, Output, signal, viewChild, ViewChild } from '@angular/core';
import { NgFor} from '@angular/common';
import { SharedService } from '../../services/shared/shared.service';
import { Product } from '../../api/product/Product';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements AfterViewInit, OnInit{
  
  // To get HTMLElemnt from "template component" and pass it To another component
  // For header;
  @ViewChild('cartTag') cartTagRef!: ElementRef<HTMLElement>;
  // For addToCart() method;
  @ViewChild('cartElement') cartElement!: ElementRef<HTMLElement>;
  @ViewChild('innerItemCart') innerItemCart!: ElementRef<HTMLElement>;
  @ViewChild('price_cart_total') price_cart_total!: ElementRef<HTMLElement>;
  
  ngAfterViewInit(){
    this.sharedService.setInnerItemCart(this.innerItemCart.nativeElement);
    this.sharedService.setPrice_cart_total(this.price_cart_total.nativeElement);
  }

  items_in_cart: Product [] = [];
  total_price!: number;
  serializedItems!: String;

  constructor(private sharedService: SharedService, private router: Router){}

  ngOnInit():void{
    this.items_in_cart = this.sharedService.getProductInCart();
  }

  navigateWithQueryParams(items_in_cart: Product []){
    console.log(items_in_cart);
    const queryParams = {items_in_cart: JSON.stringify(items_in_cart)} // Serialize JSON
    this.router.navigate(['/check-out'], {queryParams})
  }

  getCartTag(): HTMLElement{
    return this.cartTagRef.nativeElement;
  }

  close_cart(): void{
    this.cartTagRef.nativeElement?.classList.remove("active");
  }

  delete_from_cart(item: Product): void{
    
    // update Items in cart and count 
    this.innerItemCart.nativeElement.innerText = String("( " + (this.sharedService.getCount() - 1)  + " Item in cart)");
    this.sharedService.setCount(this.sharedService.getCount() - 1);
    // update price Item in cart 
    this.price_cart_total.nativeElement.innerText = String("$" + (this.sharedService.getTotalPrice() - item.price));
    this.sharedService.setTotalPrice(this.sharedService.getTotalPrice() - item.price);
    // get items that I want to deleted it
    // console.log(this.items_in_cart.length);
    this.items_in_cart = this.items_in_cart.filter((index) => index.id !== item.id);
    // console.log(this.items_in_cart.length);
    // update Items icon in header and count of it agian
    const countItemHead = this.sharedService.getCountItemHead();
    const priceCartHead = this.sharedService.getPriceCartHead();
    if (countItemHead) {
      countItemHead.innerText = String((this.sharedService.getCount()));
    }
    if (priceCartHead) {
      priceCartHead.innerText = String("$" + this.sharedService.getTotalPrice());
    }

    // Finally remove element.    
    this.sharedService.setProductInCart(this.items_in_cart);

    // Remove active class from product card to add product again in cart another time in "Product item page"
    let productAddBtn = document.getElementById("productAddBtn");
    if(productAddBtn != null){
      productAddBtn.classList.remove("active");
    } 

    // not completed yet " Ops in id use UUID "
    const cartBtn = document.querySelectorAll(".fa-cart-plus.active");
    console.log(cartBtn.length);
    for (let index = 0; index < cartBtn.length; index++) {
      cartBtn[index].classList.remove("active");
      this.items_in_cart.forEach((item,indexed)=>{
        console.log(item.id);
        if (indexed === index) {
          cartBtn[indexed].classList.add("active");
        }
      })
    }
    
     
    // }
  }

}
