import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf,NgFor} from '@angular/common';
import { SharedService } from '../../services/shared/shared.service';
import { Product } from '../../api/product/Product';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../api/category/Category';
@Component({
  selector: 'app-all-product',
  imports: [RouterOutlet,RouterLink,NgIf,NgFor],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.scss'
})
export class AllProductComponent implements OnInit{
  
  allProducts: Product[] = [];
  filterdProducts: any[] = []; 
  page!: number | null;
  size!: number | null;
  totalElement!: number | null;
  flag: boolean = false;

  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    // query get from header components
    this.route.queryParams.subscribe(params=>{
      console.log(params);
      let items = params['products'];
      if (items) {
        try {
          this.allProducts = JSON.parse(items);
          this.flag = false;
        }catch (error) {
          // Send to error Component   
          console.log(error);
        }
      }else{
        this.productService.getProductsList().subscribe((data) => {
          this.allProducts = data;
          this.flag = true; // To disappear pagination div
        })
      }
      this.page = this.sharedService.getPage();
      this.size = this.sharedService.getSize();
      this.totalElement = this.sharedService.getTotalElement();
    })
  }
  setPage(page: number){
    this.page = page;
    console.log(this.page);
    this.sharedService.loadSearchProduct(this.sharedService.getSearchTerm()!,this.page);
  }
  
  getSize(): number | null{
    return this.size;
  }

  getTotalElement(): number | null{
    return this.totalElement;
  }

  ProductFilter(event: Event): void{
    const checkbox = event.target as HTMLInputElement;
    const checkBoxName = checkbox.getAttribute('name');
    console.log(checkBoxName);
    if (checkbox.checked) {
      this.categoryService.getCatrgoryByName(checkBoxName).subscribe({
        next: (response) => {
          this.filterdProducts.unshift(...response.products);
          console.log(this.filterdProducts);
        },
        error: (err) => {
          console.error("From filter product ->",err);
        }
      })
    }else{
      const afterFilterd = this.filterdProducts.filter((removeProduct) =>{ return removeProduct.category?.name !== checkBoxName;});
      console.log(afterFilterd);
      this.filterdProducts = afterFilterd;
      console.log(this.filterdProducts);
    }
  }
  
  addToCart(productId: String,event: MouseEvent): void{
    
    this.sharedService.addToCart(productId,event);

    // add active class to prevent duplicate same Item in cart
    // const cartBtn = event.target as HTMLElement;
    // cartBtn.classList.add("active");

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
  
  calculateDiscountPercentage(oldPrice: number, price: number): number{
    if (!oldPrice) {
      return 0;
    }
    return this.sharedService.calculateDiscountPercentage(oldPrice,price);  
  }
}
