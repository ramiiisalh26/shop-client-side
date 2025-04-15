import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/product/Product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
@Component({
  selector: 'app-product-item-page',
  imports: [NgFor,NgIf,RouterLink],
  templateUrl: './product-item-page.component.html',
  styleUrl: './product-item-page.component.scss'
})
export class ProductItemPageComponent implements OnInit{
  
  product_id!: String | null;
  product!: Product;
  offer_products: Product[] | undefined;
  constructor(private route: ActivatedRoute,private sharedService: SharedService,private productService: ProductService){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) =>{
      this.product_id = params.get('product_id');
      this.productService.getProductById(String(this.product_id)).subscribe({
        next: (response) => {
          this.product = response;
        },
        error: (err) => console.error(err)
      });
    })
    console.log(this.product);
    console.log(this.product_id);
    this.productService.getOfferProducts().subscribe({
      next: (respose) => {
        console.log(respose);
        this.offer_products = respose;
      },
      error: (err) => console.error(err)
    })
    console.log(this.offer_products);
  }

  calculateDiscountPercentage(oldPrice: number | undefined ,price: number): number{
    if (!oldPrice) {
      return 0;
    }
    return this.sharedService.calculateDiscountPercentage(oldPrice,price);  
  }

  changeItemImg(img: String){
    const bigImg = document.getElementById("bigImg") as HTMLImageElement;
    if (bigImg) {
      bigImg.src = String(img);      
    }
  }

  addToCart(id: String,event: MouseEvent):void{
    this.sharedService.addToCart(id,event);

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
}
