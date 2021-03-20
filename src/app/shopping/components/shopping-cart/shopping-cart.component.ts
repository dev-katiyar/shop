import { take } from 'rxjs/operators';
import { ProductWithKey } from 'shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: ShoppingCart;
  cart$: Observable<ShoppingCart>;
  cartProductWithKeyItems: ProductWithKey[];

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(crt => {
      this.cart = crt;
      this.cartProductWithKeyItems = [];
      crt.itemsArr.forEach(item => {
        let pk = {} as ProductWithKey;
        Object.assign(pk, item);
        pk.$key = item.$key;
        this.cartProductWithKeyItems.push(pk);
      }) 
    });
    // console.log(this.cartProductWithKeyItems); //test code
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

}
