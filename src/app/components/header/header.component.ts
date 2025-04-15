import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartComponent } from "../cart/cart.component";
import { SharedService } from '../../services/shared/shared.service';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { Product } from '../../api/product/Product';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink,CartComponent,NgIf,ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit{
  
  products: Product[] | null = [];
  
  // Search Form property
  searchForm = new FormGroup({
    searchTerm: new FormControl('')//0
  })
  page: number = 0; 
  // size: number = 12;

  menu = document.getElementById("menu");

  // To get HTMLElemnt from another component
  @ViewChild(CartComponent) cartElement!: CartComponent;

  @ViewChild('countItems') countItems !: ElementRef<HTMLElement>;
  @ViewChild('price_cart_head') price_cart_head !: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const count_item = this.countItems.nativeElement;
    const price_cart_head = this.price_cart_head.nativeElement;
    this.sharedService.setPriceCartHead(price_cart_head);
    this.sharedService.setCountItemHead(count_item);
  }

  constructor(
    private sharedService: SharedService,
    private auth: AuthService,
  ){}
  
  loadSearchProduct():void{
    const searchTerm = this.searchForm.value.searchTerm;
    this.sharedService.loadSearchProduct(searchTerm as string,this.page)
  }

  isLoggedIn(){
    return this.auth.getAuthenticatedState();
  }

  open_cart(){
    const cart = this.cartElement.getCartTag(); 
    cart.classList.add('active');
  }
  
  
  open_menu(){
    this.menu?.classList.add("active");
  }

  close_menu(){
    this.menu?.classList.remove("active");
  }
  
  logout(){
    this.auth.logout().subscribe({
      next: (response) => {
        console.log('Logout success', response);
        window.location.reload();
      },
      error: (error) => console.error(error),
    })
  }
}
