import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../api/product/Product';
import { SharedService } from '../../services/shared/shared.service';
@Component({
  selector: 'app-check-out',
  imports: [NgFor],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit{
  
  items_in_cart: Product[] = []; 
  total_price: number | null = 0;
  constructor(private route: ActivatedRoute, private sharedService: SharedService){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params)=>{
      const items = params.get('items_in_cart');
      // console.log(items);
      if (items) {
        try {
          this.items_in_cart = JSON.parse(items); // Deserialize JSON
          // console.log(this.items_in_cart);          
        } catch (error) {
          console.log(error);
        }
      }
    })
    this.total_price = this.sharedService.getTotalPrice();
  }
  
}
