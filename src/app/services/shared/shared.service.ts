import { Injectable } from '@angular/core';
import data from '../../data/items.json';
import { Product } from '../../api/product/Product';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // From Header
  private count_items_head: HTMLElement | null = null;
  private price_cart_head: HTMLElement | null = null;
  // From Cart 
  private innerItemCart: HTMLElement | null = null;  
  private price_cart_total: HTMLElement | null = null;

  private products?: Product [];
  // private offer_products: Product[] = [];
  private count = 0; //
  private products_in_cart: Product[] = []; //
  private total_price = 0; //

  // For search and pagination 'AllProductComponent' and 'headerComponent' 
  private searchTermGlobal!: string | null;
  private pageGlobal!: number | null;
  private totalGlobal!: number | null;
  private sizeGlobal: number = 12;

  constructor(private productService: ProductService, private router: Router) { 
    this.productService.getProductsList().subscribe((data) => {
      this.products = data;
    })
  }

  loadSearchProduct(searchTerm: string, page: number):void{    
    this.searchTermGlobal = searchTerm;
    this.pageGlobal = page;
    
    if (searchTerm !== "") {
      this.productService.searchProduct(searchTerm!, page,this.sizeGlobal!).subscribe({
        next: (response) =>{
          this.products = response.content;
          this.totalGlobal = response.totalElements;
          console.log(this.totalGlobal);
          this.router.navigate(['/allProduct'],{queryParams: {products: JSON.stringify(this.products)}});
        },
        error: (err) =>{
          console.error("From search catch error!",err);
        }
      })  
    }
    else{
      this.productService.getProductsList().subscribe((data)=>{
        this.products = data;
        this.router.navigate(['/allProduct'],{queryParams: {products: JSON.stringify(this.products)}});
      })
    }
  }

  onPageChanged(page: number): void{
    this.pageGlobal = page;
    this.loadSearchProduct(this.searchTermGlobal!,this.pageGlobal!);
  }

  setPage(page: number): void{
    this.pageGlobal = page;
  }

  getPage(): number | null{
    return this.pageGlobal;
  }

  setTotalElement(totalElement: number): void{
    this.totalGlobal = totalElement;
  }

  getTotalElement(): number | null{
    return this.totalGlobal;
  }

  setSize(size: number): void{
    this.sizeGlobal = size;
  }
  
  getSize(): number | null{
    return this.sizeGlobal;
  }

  
  getSearchTerm(): string | null{
    return this.searchTermGlobal;
  }

  // getProductsByName(name: String | null): Product[] {
  //   console.log(name);
  //   return this.products.filter((product) => product.category === name);
  // }

  // getProductById(id: String): any{
  //   console.log(id);
  //   this.productService.getProductById(id).subscribe((data) => {
  //     console.log(data);
  //     return data;
  //   })
  //   // return null;
  // }

  addToCart(productId: String,event: MouseEvent){
    this.count++;
    this.products?.forEach((product) => {
      if (product.id === productId) {
        this.products_in_cart.push(product);
        this.total_price += product.price;
      }
    })
    const cartBtn = event.target as HTMLElement;
    console.log(event)
    cartBtn.classList.add("active");
    console.log("Hello From Cart");
  }

  

  calculateDiscountPercentage(oldPrice: number, price: number): number{
    if (!oldPrice) {
      return 0;
    }
    return Math.floor(((oldPrice - price) / oldPrice) * 100);
  }

  public getCount(): number{
    return this.count;
  }

  public setCount(count: number): void{
    this.count = count;
  }

  public getProductInCart(): Product[]{
    return this.products_in_cart;
  }

  public setProductInCart(products: Product []): void{
    this.products_in_cart = products;
  }

  public getTotalPrice(): number{
    return this.total_price;
  }

  public setTotalPrice(price: number): void{
    this.total_price = price;
  }

  public getAllProducts(): Product[] | undefined{
    return this.products;
  }

  public setCountItemHead(element: HTMLElement){
    this.count_items_head = element;
  }

  public getCountItemHead(): HTMLElement | null{
    return this.count_items_head;
  }

  public setPriceCartHead(element: HTMLElement){
    return this.price_cart_head = element;
  }
  public getPriceCartHead(): HTMLElement | null{
    return this.price_cart_head;
  }

  public getInnerItemCart(): HTMLElement | null {
    return this.innerItemCart;
  }
  public setInnerItemCart(value: HTMLElement | null) {
    this.innerItemCart = value;
  }

  public getPrice_cart_total(): HTMLElement | null {
    return this.price_cart_total;
  }

  public setPrice_cart_total(value: HTMLElement | null) {
    this.price_cart_total = value;
  }
}
