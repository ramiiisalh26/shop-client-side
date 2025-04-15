import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
// import Swiper from 'swiper';
// import { Pagination,Autoplay } from 'swiper/modules';
// import { SwiperOptions } from 'swiper/types';
// import SwiperCore from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { SharedService } from '../services/shared/shared.service';
import { Product } from '../api/product/Product';
import { ProductService } from '../services/product/product.service';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet,NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  offer_products: Product[] = [];
  products: Product[] = [];
  constructor(private sharedService: SharedService,private productServices: ProductService){ }
  ngOnInit(): void {
    this.productServices.getProductsList().subscribe({
      next: (response) =>{
        this.products = response;
      },
      error: (err) => console.log(err)
    })

    this.productServices.getOfferProducts().subscribe({
      next: (reponse) => {
        this.offer_products = reponse;
      },
      error: (err) => console.error(err)
    })

  }


  addToCart(productId: String, event: MouseEvent):void{
    this.sharedService.addToCart(productId,event);

    // add active class to prevent duplicate same Item in cart
    

    // For Header
    const count_items_head = this.sharedService.getCountItemHead();
    const price_cart_head = this.sharedService.getPriceCartHead();
    // For Cart 
    const innerItemCart = this.sharedService.getInnerItemCart();
    const price_cart_total = this.sharedService.getPrice_cart_total();

    if (count_items_head) { count_items_head.innerText = String(this.sharedService.getCount()); }
    
    if(price_cart_head){ price_cart_head.innerText = String("$" + this.sharedService.getTotalPrice()); }
    
    if (innerItemCart) { innerItemCart.innerText = String("( " + this.sharedService.getCount() + " Item in cart)"); }
    
    if (price_cart_total) { price_cart_total.innerText = String("$" + this.sharedService.getTotalPrice()); }
  }

  calculateDiscountPercentage(oldPrice: number | undefined ,price: number): number{
    if (!oldPrice) {
      return 0;
    }
    return this.sharedService.calculateDiscountPercentage(oldPrice,price);  
  }

  // swiper = new Swiper(".slide-swp", {
  //   pagination: {
  //       el: ".swiper-pagination",
  //       dynamicBullets: true,
  //       clickable: true
  //   },
  //   autoplay:{
  //       delay:2500,
  //   },
  //   loop: true,
  // });


}
